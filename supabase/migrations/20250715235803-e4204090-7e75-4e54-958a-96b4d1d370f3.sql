-- Insert comprehensive sample data for the education system

-- Insert learning paths
INSERT INTO public.learning_paths (title, description, category, difficulty_level, estimated_duration_hours, prerequisites, learning_objectives, content_structure, completion_criteria, tags) VALUES 
('Antibiotic Stewardship Fundamentals', 'Comprehensive introduction to antibiotic stewardship principles and practices', 'stewardship', 'beginner', 6, '[]'::jsonb, 
'["Understand antibiotic resistance mechanisms", "Learn appropriate prescribing practices", "Implement stewardship protocols"]'::jsonb,
'[{"type": "article", "id": "antibiotic-fundamentals-1", "order": 1}, {"type": "assessment", "title": "Knowledge Check", "order": 2}, {"type": "simulation", "title": "First Prescription Decision", "order": 3}]'::jsonb,
'{"minimum_score": 80, "required_completions": ["articles", "assessments"]}'::jsonb,
'["antibiotics", "stewardship", "fundamentals"]'::jsonb),

('Advanced Clinical Decision Making', 'Master complex antibiotic selection in challenging clinical scenarios', 'clinical', 'advanced', 12, 
'["Antibiotic Stewardship Fundamentals"]'::jsonb,
'["Apply advanced pharmacokinetics", "Manage multidrug-resistant infections", "Lead stewardship initiatives"]'::jsonb,
'[{"type": "article", "id": "advanced-clinical-1", "order": 1}, {"type": "simulation", "title": "ICU Complex Case", "order": 2}, {"type": "assessment", "title": "Expert Evaluation", "order": 3}]'::jsonb,
'{"minimum_score": 85, "required_completions": ["articles", "simulations", "assessments"]}'::jsonb,
'["advanced", "clinical", "ICU", "resistance"]'::jsonb),

('Pediatric Antimicrobial Therapy', 'Specialized antimicrobial management for pediatric patients', 'pediatrics', 'intermediate', 8,
'["Antibiotic Stewardship Fundamentals"]'::jsonb,
'["Calculate age-appropriate dosing", "Manage pediatric infections", "Consider developmental pharmacology"]'::jsonb,
'[{"type": "article", "id": "pediatric-dosing", "order": 1}, {"type": "simulation", "title": "Pediatric Sepsis", "order": 2}]'::jsonb,
'{"minimum_score": 80, "required_completions": ["articles", "simulations"]}'::jsonb,
'["pediatrics", "dosing", "children"]'::jsonb);

-- Insert enhanced assessments
INSERT INTO public.assessments (title, description, category, difficulty_level, assessment_type, time_limit_minutes, passing_score, questions, learning_objectives, tags) VALUES
('Antibiotic Resistance Mechanisms', 'Test your understanding of bacterial resistance mechanisms and their clinical implications', 'microbiology', 'intermediate', 'quiz', 45, 80,
'[
  {
    "id": "q1",
    "type": "multiple_choice",
    "question": "Which mechanism is primarily responsible for beta-lactam resistance in MRSA?",
    "options": ["Efflux pumps", "Beta-lactamase production", "Altered PBP2a", "Porin mutations"],
    "correct_answer": 2,
    "explanation": "MRSA resistance is primarily due to altered penicillin-binding protein 2a (PBP2a), encoded by mecA gene.",
    "points": 5,
    "category": "resistance_mechanisms"
  },
  {
    "id": "q2", 
    "type": "case_study",
    "question": "A 65-year-old patient with pneumonia shows resistance to multiple antibiotics. Blood culture shows Pseudomonas aeruginosa. What is the most likely resistance mechanism?",
    "patient_data": {"age": 65, "diagnosis": "pneumonia", "organism": "P. aeruginosa", "resistances": ["ceftazidime", "ciprofloxacin"]},
    "options": ["ESBL production", "Efflux pump overexpression", "Carbapenemase production", "Porin loss"],
    "correct_answer": 1,
    "explanation": "P. aeruginosa commonly develops resistance through efflux pump overexpression, particularly affecting fluoroquinolones and beta-lactams.",
    "points": 10,
    "category": "clinical_application"
  }
]'::jsonb,
'["Identify resistance mechanisms", "Apply knowledge to clinical scenarios"]'::jsonb,
'["resistance", "mechanisms", "clinical"]'::jsonb),

('ICU Antibiotic Management', 'Advanced assessment for intensive care antibiotic decisions', 'critical_care', 'advanced', 'case_study', 60, 85,
'[
  {
    "id": "icu1",
    "type": "complex_case",
    "scenario": "72-year-old post-surgical patient in ICU develops ventilator-associated pneumonia",
    "patient_data": {
      "age": 72,
      "surgery": "cardiac bypass",
      "day_post_op": 5,
      "ventilator_days": 3,
      "cultures": {"sputum": "Acinetobacter baumannii", "sensitivity": "resistant to most antibiotics"},
      "vitals": {"fever": "39.2°C", "wbc": "18000", "procalcitonin": "12.5"}
    },
    "question": "Select the most appropriate initial antibiotic regimen:",
    "options": [
      "Meropenem + Tobramycin",
      "Colistin + Tigecycline", 
      "Ceftazidime/Avibactam",
      "Polymyxin B + Rifampin"
    ],
    "correct_answer": 1,
    "explanation": "For extensively drug-resistant Acinetobacter in ICU setting, combination therapy with colistin plus tigecycline is often necessary.",
    "points": 15,
    "follow_up_questions": [
      {
        "question": "How would you monitor for colistin toxicity?",
        "type": "open_ended",
        "points": 5
      }
    ]
  }
]'::jsonb,
'["Manage complex ICU infections", "Select appropriate combination therapy", "Monitor for adverse effects"]'::jsonb,
'["ICU", "critical_care", "resistant_organisms"]'::jsonb);

-- Insert interactive simulations
INSERT INTO public.simulations (title, description, category, difficulty_level, simulation_type, scenario_data, decision_points, scoring_criteria, learning_objectives, estimated_duration_minutes, tags) VALUES
('Emergency Department Sepsis Management', 'Interactive simulation for rapid antibiotic decision-making in septic patients', 'emergency', 'intermediate', 'clinical_case', 
'{
  "patient": {
    "age": 45,
    "gender": "female", 
    "presentation": "Fever, altered mental status, hypotension",
    "vital_signs": {"temp": "39.8°C", "bp": "85/50", "hr": "125", "rr": "28"},
    "lab_results": {"wbc": "22000", "lactate": "4.2", "creatinine": "2.1"},
    "history": "Diabetes, recent UTI treatment with trimethoprim-sulfamethoxazole"
  },
  "setting": "Emergency Department",
  "time_pressure": true,
  "resources_available": ["blood cultures", "urinalysis", "imaging", "pharmacy consultation"]
}'::jsonb,
'[
  {
    "id": "decision_1",
    "time_point": "0 minutes",
    "situation": "Patient presents with sepsis. Initial assessment complete.",
    "question": "What is your immediate antibiotic choice?",
    "options": [
      {"id": "a", "text": "Ceftriaxone", "consequences": {"score": 3, "outcome": "Underdosing for sepsis"}},
      {"id": "b", "text": "Piperacillin-tazobactam", "consequences": {"score": 8, "outcome": "Good broad-spectrum choice"}},
      {"id": "c", "text": "Vancomycin + Cefepime", "consequences": {"score": 10, "outcome": "Excellent empiric coverage"}},
      {"id": "d", "text": "Wait for culture results", "consequences": {"score": 0, "outcome": "Dangerous delay"}}
    ],
    "optimal_choice": "c",
    "explanation": "Septic patients require immediate broad-spectrum coverage including MRSA and Pseudomonas."
  },
  {
    "id": "decision_2", 
    "time_point": "30 minutes",
    "situation": "Blood cultures drawn, patient stabilizing with fluids.",
    "question": "How do you dose the antibiotics?",
    "options": [
      {"id": "a", "text": "Standard dosing", "consequences": {"score": 5, "outcome": "May be suboptimal in sepsis"}},
      {"id": "b", "text": "High-dose, short-interval dosing", "consequences": {"score": 10, "outcome": "Optimal for sepsis pharmacokinetics"}},
      {"id": "c", "text": "Reduce dose due to kidney function", "consequences": {"score": 3, "outcome": "Inappropriate in acute sepsis"}}
    ],
    "optimal_choice": "b"
  }
]'::jsonb,
'{"max_score": 100, "time_bonus": true, "decision_accuracy_weight": 0.7, "explanation_quality_weight": 0.3}'::jsonb,
'["Recognize sepsis urgency", "Select appropriate empiric therapy", "Apply pharmacokinetic principles"]'::jsonb,
45,
'["sepsis", "emergency", "empiric_therapy"]'::jsonb),

('Outpatient Pneumonia Treatment', 'Decision-making simulation for community-acquired pneumonia management', 'outpatient', 'beginner', 'decision_tree',
'{
  "patient": {
    "age": 35,
    "gender": "male",
    "presentation": "Cough, fever, chest pain for 3 days",
    "vital_signs": {"temp": "38.5°C", "bp": "125/80", "hr": "95", "sats": "96%"},
    "imaging": "Chest X-ray shows right lower lobe infiltrate",
    "comorbidities": ["none"],
    "recent_antibiotics": "none in past 3 months"
  },
  "setting": "Outpatient clinic"
}'::jsonb,
'[
  {
    "id": "severity_assessment",
    "question": "What severity assessment tool would you use?",
    "options": [
      {"id": "curb65", "text": "CURB-65", "score": 10},
      {"id": "psi", "text": "Pneumonia Severity Index", "score": 8},
      {"id": "clinical", "text": "Clinical judgment only", "score": 3}
    ]
  },
  {
    "id": "antibiotic_choice",
    "question": "Based on low severity CAP, what is first-line therapy?",
    "options": [
      {"id": "amoxicillin", "text": "Amoxicillin 1g TID", "score": 10},
      {"id": "azithromycin", "text": "Azithromycin 500mg daily", "score": 6},
      {"id": "ceftriaxone", "text": "Ceftriaxone 1g daily", "score": 2}
    ]
  }
]'::jsonb,
'{"max_score": 100, "clinical_guideline_adherence": 0.8, "cost_effectiveness": 0.2}'::jsonb,
'["Apply CAP guidelines", "Use severity assessment tools", "Select appropriate outpatient therapy"]'::jsonb,
30,
'["pneumonia", "outpatient", "guidelines"]'::jsonb);

-- Insert user preferences (sample for demonstration)
INSERT INTO public.user_education_preferences (user_id, learning_style, preferred_difficulty, interested_categories, daily_learning_goal_minutes) 
SELECT id, 'visual', 'intermediate', '["clinical", "stewardship"]'::jsonb, 45 
FROM public.profiles 
WHERE role IN ('doctor', 'admin') 
LIMIT 3;