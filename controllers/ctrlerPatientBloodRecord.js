const req = require('express/lib/request');
const res = require('express/lib/response');

const mongoose = require('mongoose');
const patientModel = require('../models/patient');
const recordModel = require('../models/record');

const bloodGlucoseModel = mongoose.model('bloodGlucoses');

// The fucntion to render patient blood record page
const renderPatientBloodRecord = async (req, res) => {
    var current_year = new Date().getFullYear();
    var current_month = new Date().getMonth() + 1;
    var current_day = new Date().getDate();
    var today = current_day + '-' + current_month + '-' + current_year;

    // const data = patientData;

    // console.log("submit的data" + patientData);
    // console.log("submit的data的病人id" + data.patient_id);
    // console.log("submit的data的病人名字" + data.patientName);

    // find id 对应的 patient
    let find_id = '6267d6bb8b206aade8b24198';
    //   let patient_id = 1;

    let search_day = '15-5-2022';

    // 找出这个人的个人数据
    //   try{
    let onePatientRecord = await patientModel.findById(find_id).lean();
    //   }catch{
    //     console.log("没找到这个人");
    //   }


    // 以下代码有问题
    // let onePatientRecord = await patientModel.findById(patientObjectId).lean();

    // 挑选出这个人的今天录入的所有数据

    let onePatientBloodRecord = await recordModel
        .find({
            find_id,
            time: {
                $gte: new Date(search_day).getTime(),
            },
            time: {
                $lte: new Date(search_day).getTime() + 24 * 3600 * 1000,
            },
        }).lean();
    // let todayBloodRecord = await bloodGlucoseModel.find({
    //     patient_id,
    //     time: {
    //         $gte: Date.parse(search_day),
    //         $lte: Date.parse(search_day) + 24 * 3600 * 1000
    //     }
    // }).lean();

    // 检查数据是否存在，如果不存在返回false
    function checkRecordComplete(checkRecordComplete) {
        if (checkRecordComplete == 'undefined') {
            return false;
        } else {
            return true;
        }
    }

    if (onePatientRecord) {
        // 渲染血糖上传页面
        res.render('Blood_glucose', {
            onePatient: onePatientRecord,
            layout: 'patient_record_template',
        });

        // request the patient and bloodGlucose value from the input

        // query 用get post用 req.body.glucose_comment
        var glucose_comment = req.query.glucose_comment || 'no comments';
        var patinet_blood_glucose = req.query.patinet_blood_glucose;

        if (glucose_comment && patinet_blood_glucose) {
            let patientBloodRecord = {
                find_id,
                blood_glucose_level: patinet_blood_glucose,
                blood_glucose_level_comment: glucose_comment,
                time: today,
                complete: false,
            };

            var a = false;

            // 如果今天没有录入数据，则插入一条新的血糖值
            console.log("测试判定" + onePatientBloodRecord);
            console.log("测试" + onePatientBloodRecord.blood_glucose_level);

            
            // onePatientBloodRecord存在的时候为True，不存在的时候不为false
            if (!onePatientBloodRecord) {
                console.log("还在create");
                await recordModel.create({
                    ...patientBloodRecord,
                });
            }
            // 如果今天的血糖值为空(!blood_glu_level 要为true)，同时他被要求录入血糖值的数据(bloodGlu_record要为true)，则更新今天的血糖值
            else if (
                !onePatientBloodRecord.blood_glucose_level &&
                onePatientRecord.bloodGlucose_record
            ) {
                await recordModel.updateOne({
                    find_id,
                    time: today,
                    blood_glucose_level: patinet_blood_glucose,
                    blood_glucose_level_comment: glucose_comment,
                });

                // 如果四个数据都存在，则将complete修改为true
                if (
                    checkRecordComplete(onePatientBloodRecord.blood_glucose_level) &&
                    checkRecordComplete(onePatientBloodRecord.weight) &&
                    checkRecordComplete(onePatientBloodRecord.exercise) &&
                    checkRecordComplete(onePatientBloodRecord.insulinTaken)
                ) {
                    console.log('complete修改为true');

                    await recordModel.updateOne({
                        complete: true,
                    });
                    // 得到complete为true的标记之后，给patient的insist day + 1
                    await patientModel.updateOne({
                        // insistDay +1
                        insistDay: onePatientRecord.insistDay + 1,
                    });
                }
            } 
            
            else if(onePatientBloodRecord.blood_glucose_level 
                && onePatientRecord.bloodGlucose_record){
                // 如果今天的血糖值不为空，则更新今天的血糖值
                console.log("今天已经录入过血糖值");
                await recordModel.updateOne({
                    blood_glucose_level: patinet_blood_glucose,
                    blood_glucose_level_comment: glucose_comment,
                });
            }
        }
    } else {
        res.sendStatus(404);
    }
};

module.exports = {
    renderPatientBloodRecord,
};