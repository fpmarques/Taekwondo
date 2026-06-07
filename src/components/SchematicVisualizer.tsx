import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Activity, Zap, RefreshCw } from 'lucide-react';
import { Technique, TechniqueStep } from '../types';

interface SchematicVisualizerProps {
  technique: Technique;
}

// Coordinate definitions for stick-figure bone model based on technique and frame.
// All values are mapped to a 100x100 coord space.
interface JointCoords {
  head: { x: number; y: number };
  chest: { x: number; y: number };
  hip: { x: number; y: number };
  // Arms
  lShoulder: { x: number; y: number };
  lElbow: { x: number; y: number };
  lHand: { x: number; y: number };
  rShoulder: { x: number; y: number };
  rElbow: { x: number; y: number };
  rHand: { x: number; y: number };
  // Legs
  lHip: { x: number; y: number };
  lKnee: { x: number; y: number };
  lFoot: { x: number; y: number };
  rHip: { x: number; y: number };
  rKnee: { x: number; y: number };
  rFoot: { x: number; y: number };
  // Extra graphics
  vectorArrow?: { x1: number; y1: number; x2: number; y2: number; label: string };
  focusJoint?: 'hand' | 'foot' | 'knee' | 'hip' | 'none';
}

const DEFAULT_STANCE_COORDS: Record<number, JointCoords> = {
  1: { // Chunbi / Ready
    head: { x: 50, y: 25 },
    chest: { x: 50, y: 38 },
    hip: { x: 50, y: 55 },
    lShoulder: { x: 42, y: 38 },
    lElbow: { x: 38, y: 50 },
    lHand: { x: 46, y: 62 },
    rShoulder: { x: 58, y: 38 },
    rElbow: { x: 62, y: 50 },
    rHand: { x: 54, y: 62 },
    lHip: { x: 44, y: 55 },
    lKnee: { x: 44, y: 68 },
    lFoot: { x: 44, y: 85 },
    rHip: { x: 56, y: 55 },
    rKnee: { x: 56, y: 68 },
    rFoot: { x: 56, y: 85 },
    focusJoint: 'none'
  },
  2: {
    head: { x: 50, y: 25 },
    chest: { x: 50, y: 38 },
    hip: { x: 50, y: 55 },
    lShoulder: { x: 42, y: 38 },
    lElbow: { x: 38, y: 50 },
    lHand: { x: 46, y: 62 },
    rShoulder: { x: 58, y: 38 },
    rElbow: { x: 62, y: 50 },
    rHand: { x: 54, y: 62 },
    lHip: { x: 44, y: 55 },
    lKnee: { x: 44, y: 68 },
    lFoot: { x: 44, y: 85 },
    rHip: { x: 56, y: 55 },
    rKnee: { x: 56, y: 68 },
    rFoot: { x: 56, y: 85 },
    focusJoint: 'none'
  },
  3: {
    head: { x: 50, y: 25 },
    chest: { x: 50, y: 38 },
    hip: { x: 50, y: 55 },
    lShoulder: { x: 42, y: 38 },
    lElbow: { x: 38, y: 50 },
    lHand: { x: 46, y: 62 },
    rShoulder: { x: 58, y: 38 },
    rElbow: { x: 62, y: 50 },
    rHand: { x: 54, y: 62 },
    lHip: { x: 44, y: 55 },
    lKnee: { x: 44, y: 68 },
    lFoot: { x: 44, y: 85 },
    rHip: { x: 56, y: 55 },
    rKnee: { x: 56, y: 68 },
    rFoot: { x: 56, y: 85 },
    focusJoint: 'none'
  }
};

// Precise mathematical models for each technique's wireframes
const WIREFRAME_DATABASE: Record<string, Record<number, JointCoords>> = {
  // 1. AP SEOGI
  'ap-seogi': {
    1: DEFAULT_STANCE_COORDS[1],
    2: {
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 35, y: 50 },
      lHand: { x: 44, y: 60 },
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 65, y: 50 },
      rHand: { x: 56, y: 60 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 40, y: 68 },
      lFoot: { x: 36, y: 85 }, // Forward foot starting to move
      rHip: { x: 56, y: 55 },
      rKnee: { x: 58, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'foot'
    },
    3: {
      head: { x: 45, y: 25 },
      chest: { x: 46, y: 38 },
      hip: { x: 47, y: 55 },
      lShoulder: { x: 38, y: 38 },
      lElbow: { x: 33, y: 50 },
      lHand: { x: 41, y: 60 },
      rShoulder: { x: 54, y: 38 },
      rElbow: { x: 58, y: 50 },
      rHand: { x: 52, y: 60 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 32, y: 68 },
      lFoot: { x: 26, y: 85 }, // Advanced front foot
      rHip: { x: 52, y: 55 },
      rKnee: { x: 56, y: 70 },
      rFoot: { x: 60, y: 85 }, // Back foot remaining behind
      focusJoint: 'none'
    }
  },
  // 2. AP KUBI
  'ap-kubi': {
    1: DEFAULT_STANCE_COORDS[1],
    2: {
      head: { x: 48, y: 26 },
      chest: { x: 48, y: 39 },
      hip: { x: 48, y: 56 },
      lShoulder: { x: 40, y: 39 },
      lElbow: { x: 35, y: 51 },
      lHand: { x: 42, y: 62 },
      rShoulder: { x: 56, y: 39 },
      rElbow: { x: 63, y: 51 },
      rHand: { x: 54, y: 62 },
      lHip: { x: 42, y: 56 },
      lKnee: { x: 34, y: 68 },
      lFoot: { x: 28, y: 85 }, // stepping forward
      rHip: { x: 54, y: 56 },
      rKnee: { x: 58, y: 69 },
      rFoot: { x: 58, y: 85 },
      focusJoint: 'none'
    },
    3: {
      head: { x: 40, y: 28 }, // center of gravity lowered
      chest: { x: 40, y: 41 },
      hip: { x: 43, y: 58 },
      lShoulder: { x: 32, y: 41 },
      lElbow: { x: 28, y: 53 },
      lHand: { x: 35, y: 62 },
      rShoulder: { x: 48, y: 40 },
      rElbow: { x: 52, y: 52 },
      rHand: { x: 48, y: 62 },
      lHip: { x: 38, y: 58 },
      lKnee: { x: 18, y: 68 }, // forward knee highly broken
      lFoot: { x: 18, y: 85 }, // deep step forward
      rHip: { x: 48, y: 58 },
      rKnee: { x: 58, y: 70 }, // back knee perfectly straight
      rFoot: { x: 68, y: 85 }, // back leg stretched backward
      vectorArrow: { x1: 58, y1: 70, x2: 18, y2: 85, label: '70% FRONT WEIGHT' },
      focusJoint: 'knee'
    }
  },
  // 3. ARE MAKKI
  'are-makki': {
    1: { // Cruzado no ombro
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 54, y: 34 }, // Left arm crossed to right shoulder
      lHand: { x: 58, y: 38 },
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 46, y: 45 }, // Right arm pointing down/out
      rHand: { x: 34, y: 52 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'hand'
    },
    2: { // Gliding path
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 40, y: 48 }, // slipping down
      lHand: { x: 38, y: 62 },
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 52, y: 48 }, // pulling back to waist
      rHand: { x: 48, y: 56 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    3: { // Block complete
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 32, y: 55 }, // Low defensive position
      lHand: { x: 30, y: 74 }, // At 2-fists distance from thigh
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 62, y: 48 }, // completely locked back in hip
      rHand: { x: 52, y: 54 }, // Jang-seol (fist on waist)
      lHip: { x: 44, y: 55 },
      lKnee: { x: 32, y: 68 },
      lFoot: { x: 26, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 58, y: 70 },
      rFoot: { x: 60, y: 85 },
      vectorArrow: { x1: 50, y1: 38, x2: 30, y2: 74, label: 'LOW SHIELD' },
      focusJoint: 'hand'
    }
  },
  // 4. MOMTONG AN MAKKI
  'momtong-an-makki': {
    1: { // Engatilhamento para fora
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 26, y: 42 }, // Left arm extended out-backward
      lHand: { x: 18, y: 48 },
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 52, y: 48 }, // Right pointing forward targeting
      rHand: { x: 44, y: 48 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'hand'
    },
    2: { // Descrição do arco
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 34, y: 45 },
      lHand: { x: 38, y: 42 }, // traveling in arc
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 54, y: 48 },
      rHand: { x: 50, y: 54 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    3: { // Defesa finalizada
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 40, y: 48 },
      lHand: { x: 50, y: 42 }, // parked at center of chest, 90° angle
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 62, y: 48 },
      rHand: { x: 54, y: 55 }, // waist lock
      lHip: { x: 44, y: 55 },
      lKnee: { x: 32, y: 68 },
      lFoot: { x: 26, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 58, y: 70 },
      rFoot: { x: 60, y: 85 },
      vectorArrow: { x1: 18, y1: 48, x2: 50, y2: 42, label: '90° INNER SWEEP' },
      focusJoint: 'hand'
    }
  },
  // 5. MOMTONG JIREUGI
  'momtong-jireugi': {
    1: { // At target, one at waist
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 40, y: 48 },
      lHand: { x: 42, y: 54 }, // at waist
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 64, y: 42 },
      rHand: { x: 74, y: 42 }, // targeting ahead
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    2: { // crossover
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 46, y: 42 },
      lHand: { x: 54, y: 42 }, // moving out
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 54, y: 44 },
      rHand: { x: 50, y: 46 }, // moving back
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    3: { // punch hit
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 55, y: 42 },
      lHand: { x: 76, y: 42 }, // punch fully extended at center chest
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 62, y: 48 },
      rHand: { x: 52, y: 54 }, // opposite pulled hard at belt
      lHip: { x: 44, y: 55 },
      lKnee: { x: 32, y: 68 },
      lFoot: { x: 26, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 58, y: 70 },
      rFoot: { x: 60, y: 85 },
      vectorArrow: { x1: 42, y1: 42, x2: 76, y2: 42, label: 'CENTER STRIKE' },
      focusJoint: 'hand'
    }
  },
  // 6. APT CHAGI
  'apt-chagi': {
    1: { // Chamber
      head: { x: 45, y: 25 },
      chest: { x: 45, y: 38 },
      hip: { x: 45, y: 55 },
      lShoulder: { x: 38, y: 38 },
      lElbow: { x: 35, y: 46 },
      lHand: { x: 42, y: 50 }, // fighting stance guard
      rShoulder: { x: 52, y: 38 },
      rElbow: { x: 55, y: 46 },
      rHand: { x: 48, y: 50 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 45, y: 42 }, // high action knee chamber tucked
      lFoot: { x: 45, y: 56 }, // foot hanging down
      rHip: { x: 48, y: 55 },
      rKnee: { x: 48, y: 70 },
      rFoot: { x: 48, y: 85 },
      focusJoint: 'knee'
    },
    2: { // Extension snap
      head: { x: 40, y: 26 }, // head leaned back slightly for balance
      chest: { x: 42, y: 39 },
      hip: { x: 44, y: 55 },
      lShoulder: { x: 35, y: 39 },
      lElbow: { x: 32, y: 47 },
      lHand: { x: 38, y: 50 },
      rShoulder: { x: 48, y: 39 },
      rElbow: { x: 50, y: 47 },
      rHand: { x: 44, y: 50 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 52, y: 45 },
      lFoot: { x: 80, y: 45 }, // full kick projection forward (high/mid)
      rHip: { x: 48, y: 55 },
      rKnee: { x: 48, y: 70 },
      rFoot: { x: 48, y: 85 },
      vectorArrow: { x1: 45, y1: 56, x2: 80, y2: 45, label: 'SNAP METATARSO' },
      focusJoint: 'foot'
    },
    3: { // Return chamber
      head: { x: 45, y: 25 },
      chest: { x: 45, y: 38 },
      hip: { x: 45, y: 55 },
      lShoulder: { x: 38, y: 38 },
      lElbow: { x: 35, y: 46 },
      lHand: { x: 42, y: 50 },
      rShoulder: { x: 52, y: 38 },
      rElbow: { x: 55, y: 46 },
      rHand: { x: 48, y: 50 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 45, y: 44 }, // re-chambering
      lFoot: { x: 45, y: 58 },
      rHip: { x: 48, y: 55 },
      rKnee: { x: 48, y: 72 },
      rFoot: { x: 48, y: 85 },
      focusJoint: 'knee'
    }
  },
  // 7. DWIT KUBI
  'dwit-kubi': {
    1: DEFAULT_STANCE_COORDS[1],
    2: {
      head: { x: 50, y: 26 },
      chest: { x: 50, y: 39 },
      hip: { x: 50, y: 56 },
      lShoulder: { x: 42, y: 39 },
      lElbow: { x: 35, y: 48 },
      lHand: { x: 45, y: 55 },
      rShoulder: { x: 58, y: 39 },
      rElbow: { x: 65, y: 48 },
      rHand: { x: 55, y: 55 },
      lHip: { x: 44, y: 56 },
      lKnee: { x: 42, y: 68 },
      lFoot: { x: 38, y: 85 }, // shifting foot
      rHip: { x: 56, y: 56 },
      rKnee: { x: 58, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    3: {
      head: { x: 60, y: 26 }, // shifted weight back on right side
      chest: { x: 58, y: 39 },
      hip: { x: 56, y: 56 },
      lShoulder: { x: 50, y: 39 },
      lElbow: { x: 42, y: 48 },
      lHand: { x: 48, y: 55 },
      rShoulder: { x: 66, y: 39 },
      rElbow: { x: 72, y: 48 },
      rHand: { x: 64, y: 55 },
      lHip: { x: 52, y: 56 },
      lKnee: { x: 42, y: 70 },
      lFoot: { x: 32, y: 85 }, // front leg semi-relaxed (30%)
      rHip: { x: 58, y: 56 },
      rKnee: { x: 70, y: 72 }, // back leg deeply bent (70%)
      rFoot: { x: 60, y: 85 },
      vectorArrow: { x1: 52, y1: 56, x2: 60, y2: 85, label: '70% REAR WEIGHT' },
      focusJoint: 'knee'
    }
  },
  // 8. EOLGUN MAKKI
  'eolgun-makki': {
    1: { // Cruzadas embaixo
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 48, y: 50 }, // Left arm low center crossed
      lHand: { x: 52, y: 58 },
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 48, y: 48 }, // Right arm crossing
      rHand: { x: 44, y: 56 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'hand'
    },
    2: { // Escudo passando pelo rosto
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 40, y: 34 },
      lHand: { x: 48, y: 28 }, // shield rising
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 58, y: 48 },
      rHand: { x: 52, y: 54 },
      lHip: { x: 44, y: 55 },
      lKnee: { x: 44, y: 68 },
      lFoot: { x: 44, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 56, y: 68 },
      rFoot: { x: 56, y: 85 },
      focusJoint: 'none'
    },
    3: { // Lock alta
      head: { x: 50, y: 25 },
      chest: { x: 50, y: 38 },
      hip: { x: 50, y: 55 },
      lShoulder: { x: 42, y: 38 },
      lElbow: { x: 38, y: 20 }, // High deflection diagonal elbow
      lHand: { x: 54, y: 15 }, // One hand above head
      rShoulder: { x: 58, y: 38 },
      rElbow: { x: 62, y: 48 },
      rHand: { x: 52, y: 54 }, // belt lock
      lHip: { x: 44, y: 55 },
      lKnee: { x: 32, y: 68 },
      lFoot: { x: 26, y: 85 },
      rHip: { x: 56, y: 55 },
      rKnee: { x: 58, y: 70 },
      rFoot: { x: 60, y: 85 },
      vectorArrow: { x1: 38, y1: 20, x2: 54, y2: 15, label: '45° DEFLECTION' },
      focusJoint: 'hand'
    }
  },
  // 9. DOLLYO CHAGI
  'dollyo-chagi': {
    1: { // Chamber lateral e pivot
      head: { x: 45, y: 25 },
      chest: { x: 44, y: 38 },
      hip: { x: 45, y: 55 },
      lShoulder: { x: 38, y: 38 },
      lElbow: { x: 38, y: 48 },
      lHand: { x: 45, y: 48 },
      rShoulder: { x: 52, y: 38 },
      rElbow: { x: 50, y: 48 },
      rHand: { x: 45, y: 48 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 45, y: 52 }, // knee folded high and horizontally
      lFoot: { x: 35, y: 58 },
      rHip: { x: 48, y: 55 },
      rKnee: { x: 52, y: 70 },
      rFoot: { x: 58, y: 85 }, // shifted/pivoted foot supporting
      focusJoint: 'knee'
    },
    2: { // Kick extension
      head: { x: 35, y: 28 }, // Leaned sideward for kick counterweight
      chest: { x: 38, y: 40 },
      hip: { x: 44, y: 55 },
      lShoulder: { x: 32, y: 40 },
      lElbow: { x: 32, y: 48 },
      lHand: { x: 40, y: 48 },
      rShoulder: { x: 44, y: 40 },
      rElbow: { x: 44, y: 48 },
      rHand: { x: 40, y: 48 },
      lHip: { x: 40, y: 55 },
      lKnee: { x: 58, y: 42 },
      lFoot: { x: 80, y: 42 }, // High roundhouse kick parallel
      rHip: { x: 46, y: 55 },
      rKnee: { x: 50, y: 70 },
      rFoot: { x: 54, y: 85 }, // pivoted supporting foot 180°
      vectorArrow: { x1: 35, y1: 58, x2: 80, y2: 42, label: 'BALDEUNG ARC' },
      focusJoint: 'foot'
    },
    3: { // Return
      head: { x: 40, y: 26 },
      chest: { x: 40, y: 38 },
      hip: { x: 44, y: 55 },
      lShoulder: { x: 34, y: 38 },
      lElbow: { x: 34, y: 48 },
      lHand: { x: 42, y: 48 },
      rShoulder: { x: 48, y: 38 },
      rElbow: { x: 48, y: 48 },
      rHand: { x: 42, y: 48 },
      lHip: { x: 40, y: 55 },
      lKnee: { x: 44, y: 54 }, // folded back
      lFoot: { x: 32, y: 60 },
      rHip: { x: 46, y: 55 },
      rKnee: { x: 48, y: 70 },
      rFoot: { x: 52, y: 85 },
      focusJoint: 'knee'
    }
  },
  // 10. YOP CHAGI
  'yop-chagi': {
    1: { // Encolher ao peito lateralmente
      head: { x: 46, y: 25 },
      chest: { x: 45, y: 38 },
      hip: { x: 45, y: 55 },
      lShoulder: { x: 38, y: 38 },
      lElbow: { x: 36, y: 46 },
      lHand: { x: 43, y: 46 },
      rShoulder: { x: 52, y: 38 },
      rElbow: { x: 54, y: 46 },
      rHand: { x: 47, y: 46 },
      lHip: { x: 42, y: 55 },
      lKnee: { x: 36, y: 48 }, // Knee completely compressed next to elbow
      lFoot: { x: 32, y: 55 },
      rHip: { x: 48, y: 55 },
      rKnee: { x: 50, y: 70 },
      rFoot: { x: 54, y: 85 }, // foot already pivoting
      focusJoint: 'knee'
    },
    2: { // Thrust (pistão) lateral
      head: { x: 30, y: 30 }, // Extreme torso lean to balance high side strike
      chest: { x: 34, y: 42 },
      hip: { x: 42, y: 56 },
      lShoulder: { x: 28, y: 40 },
      lElbow: { x: 26, y: 48 },
      lHand: { x: 32, y: 48 },
      rShoulder: { x: 40, y: 40 },
      rElbow: { x: 42, y: 48 },
      rHand: { x: 36, y: 48 },
      lHip: { x: 38, y: 56 },
      lKnee: { x: 58, y: 48 },
      lFoot: { x: 82, y: 48 }, // Full straight side punch with foot blade (Balnal)
      rHip: { x: 46, y: 56 },
      rKnee: { x: 50, y: 70 },
      rFoot: { x: 56, y: 85 }, // pivoted 180°
      vectorArrow: { x1: 32, y1: 55, x2: 82, y2: 48, label: 'BALNAL THRUST' },
      focusJoint: 'foot'
    },
    3: { // Return chamber
      head: { x: 40, y: 26 },
      chest: { x: 40, y: 39 },
      hip: { x: 44, y: 55 },
      lShoulder: { x: 34, y: 39 },
      lElbow: { x: 34, y: 47 },
      lHand: { x: 41, y: 47 },
      rShoulder: { x: 48, y: 39 },
      rElbow: { x: 48, y: 47 },
      rHand: { x: 43, y: 47 },
      lHip: { x: 40, y: 55 },
      lKnee: { x: 35, y: 50 },
      lFoot: { x: 30, y: 56 },
      rHip: { x: 46, y: 55 },
      rKnee: { x: 48, y: 70 },
      rFoot: { x: 52, y: 85 },
      focusJoint: 'knee'
    }
  }
};

export default function SchematicVisualizer({ technique }: SchematicVisualizerProps) {
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms per frame
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stepsLength = technique.executionSteps.length;
  const currentStep = technique.executionSteps[activeFrame - 1] || technique.executionSteps[0];

  // Stop playing when technique changes
  useEffect(() => {
    setIsPlaying(false);
    setActiveFrame(1);
  }, [technique]);

  // Handle autolooping
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setActiveFrame((prev) => (prev >= stepsLength ? 1 : prev + 1));
      }, speed);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, speed, stepsLength]);

  const handleNext = () => {
    setIsPlaying(false);
    setActiveFrame((prev) => (prev >= stepsLength ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveFrame((prev) => (prev <= 1 ? stepsLength : prev - 1));
  };

  // Get stick coordinates (fallback to generic database if specific ID isn't mapped)
  const getWireframeCoords = (): JointCoords => {
    const specificDb = WIREFRAME_DATABASE[technique.id];
    if (specificDb && specificDb[activeFrame]) {
      return specificDb[activeFrame];
    }
    // Simple mock projection based on category if not defined
    if (technique.category === 'kick' && WIREFRAME_DATABASE['apt-chagi'][activeFrame]) {
      return WIREFRAME_DATABASE['apt-chagi'][activeFrame];
    }
    if (technique.category === 'stance' && WIREFRAME_DATABASE['ap-kubi'][activeFrame]) {
      return WIREFRAME_DATABASE['ap-kubi'][activeFrame];
    }
    if (technique.category === 'defense' && WIREFRAME_DATABASE['are-makki'][activeFrame]) {
      return WIREFRAME_DATABASE['are-makki'][activeFrame];
    }
    if (technique.category === 'attack' && WIREFRAME_DATABASE['momtong-jireugi'][activeFrame]) {
      return WIREFRAME_DATABASE['momtong-jireugi'][activeFrame];
    }
    return DEFAULT_STANCE_COORDS[activeFrame] || DEFAULT_STANCE_COORDS[1];
  };

  const coords = getWireframeCoords();

  return (
    <div id={`visualizer-container-${technique.id}`} className="font-mono text-black border-2 border-black bg-white flex flex-col md:flex-row overflow-hidden select-none">
      {/* 1. Wireframe/Blueprint Canvas Player */}
      <div className="flex-1 relative border-b md:border-b-0 md:border-r border-black bg-neutral-50 h-64 md:h-80 flex items-center justify-center overflow-hidden">
        {/* Technical Blueprint Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }} />
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Dynamic Watermarks */}
        <div className="absolute top-2 left-3 text-[10px] text-neutral-400 font-bold tracking-widest flex items-center gap-1.5">
          <Activity size={10} className="text-black inline animate-pulse" />
          <span>SIMULADOR // ESTILO WT</span>
        </div>
        <div className="absolute top-2 right-3 text-[10px] text-neutral-400 font-bold tracking-widest">
          GUP FRAME: 0{activeFrame} / 0{stepsLength}
        </div>
        <div className="absolute bottom-2 left-3 text-[8px] text-neutral-300 pointer-events-none">
          SYSTEM_ANTIGRAVITY_DRAFT_2026
        </div>

        {/* The Blueprint SVG Sticky-Person Graphic */}
        <svg viewBox="0 0 100 100" className="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-sm select-none">
          {/* Floor grid line */}
          <line x1="5" y1="85" x2="95" y2="85" stroke="#000" strokeWidth="1" strokeDasharray="2 2" />

          {/* Torque Circle or Vector directions behind figure */}
          {coords.vectorArrow && (
            <>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
                </marker>
              </defs>
              <path
                d={`M ${coords.vectorArrow.x1} ${coords.vectorArrow.y1} L ${coords.vectorArrow.x2} ${coords.vectorArrow.y2}`}
                fill="none"
                stroke="#000"
                strokeWidth="1.2"
                strokeDasharray="1.5 1.5"
                markerEnd="url(#arrow)"
                className="animate-pulse"
              />
              <text
                x={(coords.vectorArrow.x1 + coords.vectorArrow.x2) / 2}
                y={((coords.vectorArrow.y1 + coords.vectorArrow.y2) / 2) - 3}
                fontSize="4"
                textAnchor="middle"
                fill="#000"
                fontWeight="bold"
                className="select-none"
              >
                {coords.vectorArrow.label}
              </text>
            </>
          )}

          {/* Highlighting target zone with concentric rings if focused */}
          {coords.focusJoint === 'foot' && (
            <circle cx={coords.lFoot.x} cy={coords.lFoot.y} r="5" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 1" className="animate-spin" style={{ transformOrigin: `${coords.lFoot.x}px ${coords.lFoot.y}px`, animationDuration: '6s' }} />
          )}
          {coords.focusJoint === 'knee' && (
            <circle cx={coords.lKnee.x} cy={coords.lKnee.y} r="4.5" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 1" className="animate-spin" style={{ transformOrigin: `${coords.lKnee.x}px ${coords.lKnee.y}px`, animationDuration: '6s' }} />
          )}
          {coords.focusJoint === 'hand' && (
            <circle cx={coords.lHand.x} cy={coords.lHand.y} r="4" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1 1" className="animate-spin" style={{ transformOrigin: `${coords.lHand.x}px ${coords.lHand.y}px`, animationDuration: '6s' }} />
          )}

          {/* STICK FIGURE: BACK LEG (Drawn behind) */}
          <line x1={coords.hip.x} y1={coords.hip.y} x2={coords.rKnee.x} y2={coords.rKnee.y} stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
          <line x1={coords.rKnee.x} y1={coords.rKnee.y} x2={coords.rFoot.x} y2={coords.rFoot.y} stroke="#a3a3a3" strokeWidth="2.5" strokeLinecap="round" />
          {/* Back foot block */}
          <line x1={coords.rFoot.x} y1={coords.rFoot.y} x2={coords.rFoot.x + 3} y2={coords.rFoot.y} stroke="#a3a3a3" strokeWidth="3.5" strokeLinecap="round" />

          {/* STICK FIGURE: BACK ARM (Drawn behind) */}
          <line x1={coords.chest.x} y1={coords.chest.y} x2={coords.rShoulder.x} y2={coords.rShoulder.y} stroke="#a3a3a3" strokeWidth="1.5" />
          <line x1={coords.rShoulder.x} y1={coords.rShoulder.y} x2={coords.rElbow.x} y2={coords.rElbow.y} stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
          <line x1={coords.rElbow.x} y1={coords.rElbow.y} x2={coords.rHand.x} y2={coords.rHand.y} stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" />
          <circle cx={coords.rHand.x} cy={coords.rHand.y} r="2" fill="#a3a3a3" />

          {/* SPINE & CHEST */}
          <line x1={coords.chest.x} y1={coords.chest.y} x2={coords.hip.x} y2={coords.hip.y} stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          {/* Neck connection */}
          <line x1={coords.chest.x} y1={coords.chest.y} x2={coords.head.x} y2={coords.head.y - 1} stroke="#000" strokeWidth="2.5" />
          {/* HEAD (Pure hollow blueprint ring) */}
          <circle cx={coords.head.x} cy={coords.head.y} r="5" fill="#fff" stroke="#000" strokeWidth="2.5" />

          {/* STICK FIGURE: FRONT LEG (Drawn in front) */}
          {/* Hip to Knee */}
          <line x1={coords.hip.x} y1={coords.hip.y} x2={coords.lKnee.x} y2={coords.lKnee.y} stroke="#000" strokeWidth="3" strokeLinecap="round" />
          {/* Knee to Foot */}
          <line x1={coords.lKnee.x} y1={coords.lKnee.y} x2={coords.lFoot.x} y2={coords.lFoot.y} stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          {/* Joint caps */}
          <circle cx={coords.lKnee.x} cy={coords.lKnee.y} r="1.5" fill="#fff" stroke="#000" strokeWidth="1" />
          {/* Foot block based on kick form */}
          {technique.category === 'kick' && activeFrame === 2 ? (
            <line x1={coords.lFoot.x} y1={coords.lFoot.y} x2={coords.lFoot.x + 3} y2={coords.lFoot.y - 2} stroke="#000" strokeWidth="4.5" strokeLinecap="square" />
          ) : (
            <line x1={coords.lFoot.x} y1={coords.lFoot.y} x2={coords.lFoot.x - 3} y2={coords.lFoot.y} stroke="#000" strokeWidth="4.5" strokeLinecap="square" />
          )}

          {/* STICK FIGURE: FRONT ARM (Drawn in front) */}
          <line x1={coords.chest.x} y1={coords.chest.y} x2={coords.lShoulder.x} y2={coords.lShoulder.y} stroke="#000" strokeWidth="2" />
          <line x1={coords.lShoulder.x} y1={coords.lShoulder.y} x2={coords.lElbow.x} y2={coords.lElbow.y} stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={coords.lElbow.x} y1={coords.lElbow.y} x2={coords.lHand.x} y2={coords.lHand.y} stroke="#000" strokeWidth="3" strokeLinecap="round" />
          <circle cx={coords.lHand.x} cy={coords.lHand.y} r="2" fill="#fff" stroke="#000" strokeWidth="1.5" />
          <circle cx={coords.lElbow.x} cy={coords.lElbow.y} r="1" fill="#fff" stroke="#000" strokeWidth="1" />
        </svg>

        {/* Dynamic Frame Controls Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center bg-white border border-black p-1 gap-1 filter drop-shadow-sm">
          <button
            onClick={handlePrev}
            id={`btn-prev-frame-${technique.id}`}
            aria-label="Frame Anterior"
            className="p-1 hover:bg-black hover:text-white transition-colors duration-100"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            id={`btn-play-toggle-${technique.id}`}
            aria-label={isPlaying ? 'Pausar Simulador' : 'Iniciar Simulador'}
            className="px-2 py-0.5 text-xs font-bold border-l border-r border-black hover:bg-black hover:text-white transition-colors duration-100 flex items-center gap-1.5"
          >
            {isPlaying ? (
              <>
                <Pause size={11} fill="currentColor" />
                <span>PAUSA</span>
              </>
            ) : (
              <>
                <Play size={11} fill="currentColor" />
                <span>PLAY</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            id={`btn-next-frame-${technique.id}`}
            aria-label="Próximo Frame"
            className="p-1 hover:bg-black hover:text-white transition-colors duration-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Slow-mo settings tag */}
        <div className="absolute bottom-3 left-3 flex items-center bg-white border border-black text-[9px] font-bold p-1 gap-1">
          <span className="text-neutral-400 pl-1 uppercase">VELOCIDADE:</span>
          <button
            onClick={() => setSpeed(1600)}
            className={`px-1.5 py-0.5 border ${speed === 1600 ? 'bg-black text-white' : 'hover:bg-neutral-100 border-transparent'}`}
          >
            0.5x
          </button>
          <button
            onClick={() => setSpeed(1000)}
            className={`px-1.5 py-0.5 border ${speed === 1000 ? 'bg-black text-white' : 'hover:bg-neutral-100 border-transparent'}`}
          >
            1.0x
          </button>
          <button
            onClick={() => setSpeed(400)}
            className={`px-1.5 py-0.5 border ${speed === 400 ? 'bg-black text-white' : 'hover:bg-neutral-100 border-transparent'}`}
          >
            2.0x
          </button>
        </div>
      </div>

      {/* 2. Step Detailed Metadata Description Panel */}
      <div className="md:w-64 p-4 flex flex-col justify-between bg-white text-xs">
        <div>
          {/* Active Frame Indicator Badge */}
          <div className="flex items-center justify-between border-b border-black pb-1.5 mb-2.5">
            <span className="font-bold tracking-wider text-neutral-800 text-[10px] uppercase flex items-center gap-1.5">
              <Zap size={11} className="text-black" />
              <span>PASSO {activeFrame} DE {stepsLength}</span>
            </span>
            <span className="font-mono text-[9px] bg-neutral-100 px-1.5 py-0.5 border border-black font-semibold uppercase">
              {currentStep.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-neutral-700 leading-relaxed min-h-[50px] mb-3">
            {currentStep.description}
          </p>

          {/* Blueprint Annotations / Pointers */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-neutral-400 tracking-wider block uppercase mb-1">
              DIRETRIZES TÉCNICAS // DETALHES:
            </span>
            {currentStep.annotations?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 font-mono text-[10px] text-neutral-800">
                <span className="text-neutral-400">└</span>
                <span>{item}</span>
              </div>
            )) || (
              <div className="text-neutral-400 italic text-[10px]">
                Nenhuma diretriz adicional.
              </div>
            )}
          </div>
        </div>

        {/* Technical Frame Selector Dots */}
        <div className="flex items-center gap-1.5 mt-4 border-t border-black pt-3">
          {technique.executionSteps.map((step, idx) => (
            <button
              key={step.frame}
              onClick={() => {
                setIsPlaying(false);
                setActiveFrame(step.frame);
              }}
              id={`dot-frame-${technique.id}-${step.frame}`}
              aria-label={`Ir para Passo ${step.frame}`}
              className={`flex-1 text-center py-1 font-bold transition-all duration-100 border ${
                activeFrame === step.frame
                  ? 'bg-black text-white border-black font-bold'
                  : 'bg-white text-neutral-500 hover:bg-neutral-100 border-neutral-300'
              }`}
            >
              {step.frame}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
