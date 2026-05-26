import db from '../db.js'

export const saveSurvey = (
  req,
  res
) => {

  const {
    student,
    responses,
    averageRating
  } = req.body


  const sql = `

    INSERT INTO surveys
    (

      fakultas,
      average_rating,
      responses

    )

    VALUES (?,?,?)

  `


  db.query(

    sql,

    [

      student.fakultas,

      averageRating,

      JSON.stringify(
        responses
      )

    ],

    (err,result)=>{

      if(err){

        console.log(
          "ERROR SURVEY:",
          err
        )

        return res
        .status(500)
        .json({

          success:false,

          message:
          err.message

        })

      }


      const surveyId=
      result.insertId


      console.log(
      "Survey tersimpan ID:",
      surveyId
      )

// ====================
// DETAIL RESPON
// ====================

responses.forEach((item)=>{

db.query(

`

INSERT INTO survey_responses
(

survey_id,
layanan,
service_id,
rating,
komentar

)

VALUES (?,?,?,?,?)

`,

[

surveyId,

item.serviceName,

item.serviceId,

item.rating,

item.comment || null

],

(err)=>{

if(err){

console.log(
"ERROR RESPONSE:",
err
)

}else{

console.log(
"Response berhasil"
)

}

}

)

})



      // ====================
      // NOTIFIKASI
      // ====================

      db.query(

      `

      INSERT INTO notifications
      (

      pesan,
      status

      )

      VALUES (?,?)

      `,

      [

      `Survey baru dari ${student.fakultas}`,

      'unread'

      ],

      (notifErr)=>{

      if(notifErr){

      console.log(
      "ERROR NOTIF:",
      notifErr
      )

      }else{

      console.log(
      "Notifikasi berhasil"
      )

      }

      }

      )



      if(
      averageRating < 3
      ){

      db.query(

      `

      INSERT INTO notifications
      (

      pesan,
      status

      )

      VALUES (?,?)

      `,

      [

      `Rating rendah dari ${student.fakultas}`,

      'unread'

      ],

      (notifErr)=>{

      if(notifErr){

      console.log(
      "ERROR RATING:",
      notifErr
      )

      }

      }

      )

      }



      // ====================
      // SENTIMENT
      // ====================

      let hasil='Netral'

      if(
      averageRating>=4
      ){

      hasil='Positif'

      }

      else if(
      averageRating<=2
      ){

      hasil='Negatif'

      }


      db.query(

      `

      INSERT INTO
      sentiment_analysis
      (

      survey_id,
      hasil,
      skor

      )

      VALUES (?,?,?)

      `,

      [

      surveyId,

      hasil,

      averageRating

      ],

      (sentErr)=>{

      if(sentErr){

      console.log(
      "ERROR SENTIMENT:",
      sentErr
      )

      }else{

      console.log(
      "Sentiment berhasil"
      )

      }

      }

      )


      res.json({

      success:true

      })

    }

  )

}



export const getSurveys=(

req,
res

)=>{

const period = req.query.period || '30'

const days = parseInt(period)

const sql = `

SELECT *

FROM surveys

ORDER BY id DESC

`

db.query(
  sql,

(err,results)=>{

if(err){

return res
.status(500)
.json({

success:false,

message:
err.message

})

}

res.json({

success: true,

data: results

})

}

)

}