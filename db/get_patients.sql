SELECT  survey.*, survey.id as survey_id, patients.*, healthworkers.name as healthworker_name
FROM patients
LEFT JOIN healthworkers on patients.healthworker_id = healthworkers.id
FULL JOIN survey on patients.survey_id = survey.id
ORDER BY patients.id
