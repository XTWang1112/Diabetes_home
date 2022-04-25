module.exports = [
    {
        patientName: 'Pat',
        age: '36',
        gender: 'male',
        photo_url: 'Pat.png',
        
        timestamp_blood_glucose_level: '25/4/2022',
        today_blood_glucose_level: '180',
        
        timestamp_weight: '24/4/2022',
        today_weight: '65.0',

        timestamp_insulin_taken: '25/4/2022',
        today_insulin_taken: '3',
        
        timestamp_exercise: '24/4/2022',
        today_exercise: '5000',

        blood_glucose_level: [
            {
                time: '23/4/2022',
                value: '180'
            },
            {
                time: '24/4/2022',
                value: '179'
            }
        ],


        weight: [
            {
                time: '23/4/2022',
                value: '65.0'
            },
            {
                time: '24/4/2022',
                value: '64.8'
            }
        ],
        insulin_taken: [
            {
                time: '23/4/2022',
                value: '3'
            },
            {
                time: '24/4/2022',
                value: '3'
            }
        ],
        exercise: [
            {
                time: '23/4/2022',
                value: '5000'
            },
            {
                time: '24/4/2022',
                value: '5000'
            }
        ],
        comments: [
            {
                comment: 'This is a comment',
                time: '23/4/2022'
            },
            {
                comment: 'This is a comment',
                time: '24/4/2022'
            }
        ]
    }
]