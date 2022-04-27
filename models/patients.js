
module.exports = [
    {
        patientName: 'Pat',
        patientID: 1,
        age: 36,
        gender: 'male',
        photo_url: 'Pat.png',
        insistDay : 0,
        
        timestamp_blood_glucose_level: '25/4/2022',
        today_blood_glucose_level: 180,
        blood_glucose_level_lower_bound: 160,
        blood_glucose_level_upper_bound: 200,

        timestamp_weight: '25/4/2022',
        today_weight: 65.0,
        weight_lower_bound: 60.0,
        weight_upper_bound: 70.0,

        timestamp_insulin_taken: '25/4/2022',
        today_insulin_taken: 10,
        insulin_taken_lower_bound: 2,
        insulin_taken_upper_bound: 5,
        
        timestamp_exercise: '24/4/2022',
        today_exercise: 5000,
        exercise_lower_bound: 100,
        exercise_upper_bound: 10000,

        blood_glucose_level: [
            {
                time: '23/4/2022',
                value: 180
            },
            {
                time: '24/4/2022',
                value: 179
            }
        ],


        weight: [
            {
                time: '23/4/2022',
                value: 65.0
            },
            {
                time: '24/4/2022',
                value: 64.8
            }
        ],
        insulin_taken: [
            {
                time: '23/4/2022',
                value: 3
            },
            {
                time: '24/4/2022',
                value: 3
            }
        ],
        exercise: [
            {
                time: '23/4/2022',
                value: 5000
            },
            {
                time: '24/4/2022',
                value: 5000
            }
        ],
        comments: [
            {
                comment: 'This is a comment',
                time: '23/4/2022'
            }
        ]
    }
] 