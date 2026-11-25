import { Subject, Chapter } from "../types/database";

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    description: "Mechanics, Thermodynamics, Electromagnetism, Modern Physics & Optics",
    icon_name: "Atom",
    color_accent: "#3B82F6",
    total_questions: 1540,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Physical Chemistry, Organic Mechanisms, Coordination & Inorganic Chemistry",
    icon_name: "FlaskConical",
    color_accent: "#10B981",
    total_questions: 1620,
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Differential & Integral Calculus, Vectors, 3D Geometry & Coordinate Geometry",
    icon_name: "Compass",
    color_accent: "#F59E0B",
    total_questions: 1780,
  },
];

export const CHAPTERS: Chapter[] = [
  // Physics
  { id: "p-01", subject_id: "physics", name: "Rotational Dynamics & Inertia", class_level: 11, weightage_percent: 5.2, total_questions: 120 },
  { id: "p-02", subject_id: "physics", name: "Work, Energy & Power", class_level: 11, weightage_percent: 4.1, total_questions: 95 },
  { id: "p-03", subject_id: "physics", name: "Thermodynamics & Carnot Cycle", class_level: 11, weightage_percent: 4.8, total_questions: 110 },
  { id: "p-04", subject_id: "physics", name: "Electrostatics & Gauss's Law", class_level: 12, weightage_percent: 5.5, total_questions: 140 },
  { id: "p-05", subject_id: "physics", name: "Current Electricity & Kirchoff's Rules", class_level: 12, weightage_percent: 6.0, total_questions: 155 },
  { id: "p-06", subject_id: "physics", name: "Electromagnetic Induction & AC", class_level: 12, weightage_percent: 4.5, total_questions: 115 },
  { id: "p-07", subject_id: "physics", name: "Ray Optics & Optical Instruments", class_level: 12, weightage_percent: 5.0, total_questions: 130 },
  { id: "p-08", subject_id: "physics", name: "Modern Physics & Photoelectric Effect", class_level: 12, weightage_percent: 6.8, total_questions: 175 },

  // Chemistry
  { id: "c-01", subject_id: "chemistry", name: "Chemical Bonding & VSEPR Theory", class_level: 11, weightage_percent: 5.8, total_questions: 145 },
  { id: "c-02", subject_id: "chemistry", name: "Chemical Thermodynamics & Enthalpy", class_level: 11, weightage_percent: 4.2, total_questions: 105 },
  { id: "c-03", subject_id: "chemistry", name: "Ionic & Chemical Equilibrium", class_level: 11, weightage_percent: 4.5, total_questions: 125 },
  { id: "c-04", subject_id: "chemistry", name: "Coordination Chemistry & Ligands", class_level: 12, weightage_percent: 6.0, total_questions: 150 },
  { id: "c-05", subject_id: "chemistry", name: "Aldehydes, Ketones & Carboxylic Acids", class_level: 12, weightage_percent: 6.2, total_questions: 160 },
  { id: "c-06", subject_id: "chemistry", name: "Electrochemistry & Nernst Equation", class_level: 12, weightage_percent: 4.8, total_questions: 120 },
  { id: "c-07", subject_id: "chemistry", name: "p-Block & d-Block Elements", class_level: 12, weightage_percent: 5.2, total_questions: 135 },

  // Mathematics
  { id: "m-01", subject_id: "mathematics", name: "Definite Integration & Area Under Curve", class_level: 12, weightage_percent: 6.5, total_questions: 170 },
  { id: "m-02", subject_id: "mathematics", name: "Differential Equations", class_level: 12, weightage_percent: 4.5, total_questions: 115 },
  { id: "m-03", subject_id: "mathematics", name: "Vectors & 3-Dimensional Geometry", class_level: 12, weightage_percent: 7.2, total_questions: 190 },
  { id: "m-04", subject_id: "mathematics", name: "Matrices, Determinants & System of Eqns", class_level: 12, weightage_percent: 5.0, total_questions: 135 },
  { id: "m-05", subject_id: "mathematics", name: "Conic Sections (Parabola, Ellipse, Hyperbola)", class_level: 11, weightage_percent: 5.5, total_questions: 145 },
  { id: "m-06", subject_id: "mathematics", name: "Sequence & Series (AP, GP, AGP)", class_level: 11, weightage_percent: 4.0, total_questions: 100 },
  { id: "m-07", subject_id: "mathematics", name: "Probability & Bayes' Theorem", class_level: 12, weightage_percent: 4.6, total_questions: 120 },
];
