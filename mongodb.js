// Declare a Mongoose Schema
const patientSchema = new mongoose.Schema({
  patientName: String,
  patientID: Number,
  age: Number,
  gender: String,
  photo_url: String,
  insistDay: Number,
  birthday: String,

  bloodGlucose_lowerBound: Number,
  bloodGlucose_upperBound: Number,
  weight_lowerBound: Number,
  weight_upperBound: Number,
});

// Compile the schema into a model
const patientModel = mongoose.model("patients", patientSchema);




{
  "_id": {
    "$oid": "6267d6bb8b206aade8b24198"
  },
  "patientName": "Pat",
  "patientID": 1,
  "gender": "male",
  "photo_url": "Pat.png",
  "insistDay": 0, // 收到的complete数量 除以 注册天数
  "birthday": "1988-01-01",
  "bloodGlucose_lowerBound": {
    "$numberDecimal": "3.3"
  },
  "bloodGlucose_upperBound": {
    "$numberDecimal": "6.1"
  }

}


record:
{
  "time": "2020-04-03",
  blood_glucose_level: 10,
  weight: 10,
  exercise: 10,
  insulin: 10,
  compete: true
},
{
  time: "2020-04-02",
  blood_glucose_level: 10,
  weight: 10,
  exercise: 10,
  insulin: 10,
  compete: true
},
{
  time: "2020-04-01",
  blood_glucose_level: 10,
  weight: 10,
  exercise: 10,
  insulin: 10,
  compete: true
}
