-- Create sample learning paths
INSERT INTO public.learning_paths (
  title,
  description,
  category,
  difficulty_level,
  estimated_duration_hours,
  prerequisites,
  learning_objectives,
  content_structure,
  completion_criteria,
  tags,
  is_active,
  created_by
) VALUES 
(
  'Antibiotic Stewardship Fundamentals',
  'Comprehensive introduction to antimicrobial stewardship principles and practices',
  'fundamentals',
  'beginner',
  6,
  '[]'::jsonb,
  '["Understand core principles of antibiotic stewardship", "Learn appropriate prescribing practices", "Identify common resistance patterns"]'::jsonb,
  '[
    {"type": "article", "id": "basics", "title": "Basic Principles", "order": 1, "estimated_minutes": 30},
    {"type": "assessment", "id": "fundamentals-quiz", "title": "Knowledge Check", "order": 2, "estimated_minutes": 15},
    {"type": "article", "id": "resistance", "title": "Understanding Resistance", "order": 3, "estimated_minutes": 45}
  ]'::jsonb,
  '{"minimum_score": 80, "required_completions": ["basics", "fundamentals-quiz"]}'::jsonb,
  '["stewardship", "fundamentals", "beginner"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'Clinical Decision Making',
  'Advanced course on clinical decision-making for complex infectious disease cases',
  'clinical',
  'intermediate',
  12,
  '["basics"]'::jsonb,
  '["Develop clinical reasoning skills", "Master complex case analysis", "Apply guidelines to real scenarios"]'::jsonb,
  '[
    {"type": "article", "id": "clinical-reasoning", "title": "Clinical Reasoning", "order": 1, "estimated_minutes": 60},
    {"type": "simulation", "id": "sepsis-case", "title": "Sepsis Management", "order": 2, "estimated_minutes": 90},
    {"type": "assessment", "id": "clinical-assessment", "title": "Clinical Skills Test", "order": 3, "estimated_minutes": 45}
  ]'::jsonb,
  '{"minimum_score": 85, "required_completions": ["clinical-reasoning", "sepsis-case", "clinical-assessment"]}'::jsonb,
  '["clinical", "decision-making", "intermediate"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'Pediatric Antimicrobial Therapy',
  'Specialized training for pediatric antibiotic prescribing',
  'pediatrics',
  'advanced',
  8,
  '["basics", "clinical-reasoning"]'::jsonb,
  '["Master pediatric dosing calculations", "Understand age-specific considerations", "Learn pediatric resistance patterns"]'::jsonb,
  '[
    {"type": "article", "id": "pediatric-dosing", "title": "Pediatric Dosing", "order": 1, "estimated_minutes": 45},
    {"type": "simulation", "id": "pediatric-case", "title": "Pediatric Case Study", "order": 2, "estimated_minutes": 60},
    {"type": "assessment", "id": "pediatric-quiz", "title": "Pediatric Knowledge Test", "order": 3, "estimated_minutes": 30}
  ]'::jsonb,
  '{"minimum_score": 90, "required_completions": ["pediatric-dosing", "pediatric-case", "pediatric-quiz"]}'::jsonb,
  '["pediatrics", "specialized", "advanced"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
);

-- Create sample assessments
INSERT INTO public.assessments (
  title,
  description,
  category,
  difficulty_level,
  assessment_type,
  time_limit_minutes,
  passing_score,
  questions,
  prerequisites,
  learning_objectives,
  tags,
  is_active,
  created_by
) VALUES 
(
  'Antibiotic Fundamentals Quiz',
  'Test your knowledge of basic antibiotic principles and mechanisms',
  'fundamentals',
  'beginner',
  'quiz',
  30,
  80,
  '[
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Which of the following is the primary mechanism of action of penicillin?",
      "options": ["Inhibits protein synthesis", "Inhibits cell wall synthesis", "Inhibits DNA replication", "Inhibits RNA synthesis"],
      "correct_answer": 1,
      "explanation": "Penicillin inhibits cell wall synthesis by binding to penicillin-binding proteins (PBPs).",
      "points": 10,
      "category": "mechanisms"
    },
    {
      "id": "q2",
      "type": "multiple_choice",
      "question": "What is the most appropriate empiric therapy for uncomplicated cystitis in a healthy adult woman?",
      "options": ["Ciprofloxacin", "Nitrofurantoin", "Amoxicillin-clavulanate", "Cephalexin"],
      "correct_answer": 1,
      "explanation": "Nitrofurantoin is first-line therapy for uncomplicated cystitis due to its efficacy and low resistance rates.",
      "points": 10,
      "category": "clinical"
    }
  ]'::jsonb,
  '[]'::jsonb,
  '["Demonstrate understanding of antibiotic mechanisms", "Apply knowledge to common clinical scenarios"]'::jsonb,
  '["fundamentals", "quiz", "mechanisms"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'Clinical Case Analysis',
  'Advanced assessment using complex clinical scenarios',
  'clinical',
  'intermediate',
  'case_study',
  60,
  85,
  '[
    {
      "id": "case1",
      "type": "case_study",
      "question": "A 65-year-old diabetic patient presents with fever, hypotension, and altered mental status. Blood cultures are pending. What is your empiric antibiotic choice?",
      "patient_data": {
        "age": 65,
        "comorbidities": ["diabetes", "hypertension"],
        "presentation": "septic shock",
        "allergies": "none known"
      },
      "explanation": "Broad-spectrum coverage is needed for septic shock, considering MRSA and Pseudomonas coverage.",
      "points": 25,
      "category": "sepsis"
    }
  ]'::jsonb,
  '["basics"]'::jsonb,
  '["Apply clinical reasoning to complex cases", "Demonstrate appropriate empiric therapy selection"]'::jsonb,
  '["clinical", "case-study", "sepsis"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'Resistance Patterns Recognition',
  'Assessment focused on identifying and managing antibiotic resistance',
  'resistance',
  'advanced',
  'quiz',
  45,
  90,
  '[
    {
      "id": "r1",
      "type": "multiple_choice",
      "question": "A patient has a UTI caused by E. coli with an ESBL enzyme. Which antibiotic would be most appropriate?",
      "options": ["Ceftriaxone", "Meropenem", "Ciprofloxacin", "Ampicillin"],
      "correct_answer": 1,
      "explanation": "Carbapenems like meropenem are the drugs of choice for ESBL-producing organisms.",
      "points": 15,
      "category": "resistance"
    }
  ]'::jsonb,
  '["basics", "clinical-reasoning"]'::jsonb,
  '["Identify resistance mechanisms", "Select appropriate therapy for resistant organisms"]'::jsonb,
  '["resistance", "ESBL", "advanced"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
);

-- Create sample simulations
INSERT INTO public.simulations (
  title,
  description,
  category,
  difficulty_level,
  simulation_type,
  scenario_data,
  decision_points,
  scoring_criteria,
  learning_objectives,
  prerequisites,
  estimated_duration_minutes,
  tags,
  is_active,
  created_by
) VALUES 
(
  'Emergency Department Sepsis Case',
  'Interactive simulation of managing a patient with sepsis in the emergency department',
  'emergency',
  'intermediate',
  'clinical_case',
  '{
    "patient": {
      "age": 72,
      "gender": "female",
      "chief_complaint": "fever and confusion",
      "vital_signs": {
        "temperature": "39.2°C",
        "blood_pressure": "85/45 mmHg",
        "heart_rate": "125 bpm",
        "respiratory_rate": "28/min",
        "oxygen_saturation": "92% on room air"
      },
      "medical_history": ["diabetes", "CKD stage 3"],
      "medications": ["metformin", "lisinopril"],
      "allergies": "penicillin (rash)"
    },
    "presentation": "Patient brought by family for 2-day history of fever, decreased oral intake, and increasing confusion."
  }'::jsonb,
  '[
    {
      "id": "initial_assessment",
      "time_point": "0 minutes",
      "situation": "Patient arrives in ED with vital signs as noted above",
      "question": "What is your immediate priority?",
      "options": [
        {"id": "a", "text": "Order blood cultures and start antibiotics", "score": 15},
        {"id": "b", "text": "Obtain IV access and start fluid resuscitation", "score": 20},
        {"id": "c", "text": "Order chest X-ray and urinalysis", "score": 10},
        {"id": "d", "text": "Consult infectious disease", "score": 5}
      ],
      "optimal_choice": "b",
      "explanation": "In septic shock, immediate fluid resuscitation and hemodynamic support are the priority."
    },
    {
      "id": "antibiotic_choice",
      "time_point": "30 minutes",
      "situation": "Patient has received 2L normal saline, blood pressure improved to 95/60. Cultures obtained.",
      "question": "Choose empiric antibiotic therapy:",
      "options": [
        {"id": "a", "text": "Ceftriaxone + azithromycin", "score": 10},
        {"id": "b", "text": "Vancomycin + piperacillin-tazobactam", "score": 20},
        {"id": "c", "text": "Levofloxacin monotherapy", "score": 15},
        {"id": "d", "text": "Meropenem + vancomycin", "score": 18}
      ],
      "optimal_choice": "b",
      "explanation": "Broad-spectrum coverage including MRSA and Pseudomonas is appropriate for septic shock of unknown source."
    }
  ]'::jsonb,
  '{
    "total_points": 100,
    "timing_bonus": 10,
    "decision_accuracy": 60,
    "clinical_reasoning": 30
  }'::jsonb,
  '["Manage sepsis according to guidelines", "Demonstrate appropriate antibiotic selection", "Apply hemodynamic support principles"]'::jsonb,
  '["basics", "clinical-reasoning"]'::jsonb,
  90,
  '["sepsis", "emergency", "simulation", "clinical-case"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'Pediatric Meningitis Management',
  'Complex pediatric case involving suspected bacterial meningitis',
  'pediatrics',
  'advanced',
  'clinical_case',
  '{
    "patient": {
      "age": "18 months",
      "gender": "male",
      "chief_complaint": "fever and irritability",
      "vital_signs": {
        "temperature": "39.8°C",
        "blood_pressure": "normal for age",
        "heart_rate": "elevated",
        "respiratory_rate": "normal"
      },
      "physical_exam": "irritable, neck stiffness, bulging fontanelle",
      "medical_history": "previously healthy",
      "immunizations": "up to date"
    },
    "presentation": "18-month-old male with 12-hour history of high fever and increasing irritability."
  }'::jsonb,
  '[
    {
      "id": "diagnosis",
      "time_point": "0 minutes",
      "situation": "Child presents with fever, irritability, and concerning physical findings",
      "question": "What is your most likely diagnosis and next step?",
      "options": [
        {"id": "a", "text": "Viral illness - observe and symptomatic care", "score": 5},
        {"id": "b", "text": "Bacterial meningitis - immediate lumbar puncture", "score": 20},
        {"id": "c", "text": "Febrile seizure - neurological workup", "score": 8},
        {"id": "d", "text": "UTI - obtain urine culture", "score": 3}
      ],
      "optimal_choice": "b",
      "explanation": "Clinical presentation strongly suggests bacterial meningitis requiring immediate evaluation and treatment."
    }
  ]'::jsonb,
  '{
    "total_points": 100,
    "diagnostic_accuracy": 40,
    "treatment_appropriateness": 40,
    "timing": 20
  }'::jsonb,
  '["Recognize pediatric meningitis", "Apply age-appropriate dosing", "Understand pediatric-specific considerations"]'::jsonb,
  '["pediatrics", "clinical-reasoning"]'::jsonb,
  60,
  '["pediatrics", "meningitis", "emergency", "advanced"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
),
(
  'ICU Antibiotic De-escalation',
  'Advanced simulation focusing on antibiotic stewardship in the ICU setting',
  'stewardship',
  'advanced',
  'decision_tree',
  '{
    "setting": "Medical ICU",
    "patient": {
      "age": 58,
      "diagnosis": "pneumonia with respiratory failure",
      "icu_day": 5,
      "current_antibiotics": "meropenem + vancomycin",
      "culture_results": "S. pneumoniae sensitive to penicillin",
      "clinical_status": "improving, afebrile x 48 hours"
    }
  }'::jsonb,
  '[
    {
      "id": "de_escalation",
      "time_point": "ICU Day 5",
      "situation": "Patient improving with culture results available",
      "question": "What is the most appropriate antibiotic modification?",
      "options": [
        {"id": "a", "text": "Continue current regimen", "score": 5},
        {"id": "b", "text": "Switch to penicillin G", "score": 20},
        {"id": "c", "text": "Switch to ceftriaxone", "score": 15},
        {"id": "d", "text": "Stop all antibiotics", "score": 0}
      ],
      "optimal_choice": "b",
      "explanation": "De-escalation to penicillin G is appropriate for penicillin-sensitive S. pneumoniae."
    }
  ]'::jsonb,
  '{
    "total_points": 100,
    "stewardship_principles": 50,
    "safety_considerations": 30,
    "cost_effectiveness": 20
  }'::jsonb,
  '["Apply stewardship principles", "Demonstrate appropriate de-escalation", "Balance efficacy and safety"]'::jsonb,
  '["clinical-reasoning", "resistance"]'::jsonb,
  45,
  '["stewardship", "de-escalation", "ICU", "advanced"]'::jsonb,
  true,
  (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1)
);