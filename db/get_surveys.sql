SELECT * FROM survey
JOIN patients on survey.patient_id = patients.id
ORDER BY survey.id;