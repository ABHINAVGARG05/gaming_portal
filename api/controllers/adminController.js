const User = require("../models/userModel")

//get all users
exports.getAllUsers = async (req,res)=>{
    const data = await User.find({role: { $in: ["admin", "user"] }})
    res.status(200).json(data);
}

//get leaderboard
exports.leaderboard = async (req,res)=>{
    try{
        const leaderBoard = await User.aggregate([
                {
                  '$project': {
                    'userId': '$userId', 
                    'maxSnake': {
                      '$max': '$snake'
                    }, 
                    'maxMaze': {
                      '$max': '$maze'
                    }, 
                    'maxSudoku': {
                      '$max': '$sudoku'
                    }, 
                    'maxTempleRun': {
                      '$max': '$templerun'
                    }
                  }
                }, {
                  '$addFields': {
                    'totalScore': {
                      '$add': [
                        {
                          '$ifNull': [
                            {
                              '$toDouble': '$maxSnake'
                            }, 0
                          ]
                        }, {
                          '$ifNull': [
                            {
                              '$toDouble': '$maxMaze'
                            }, 0
                          ]
                        }, {
                          '$ifNull': [
                            {
                              '$toDouble': '$maxSudoku'
                            }, 0
                          ]
                        }, {
                          '$ifNull': [
                            {
                              '$toDouble': '$maxTempleRun'
                            }, 0
                          ]
                        }
                      ]
                    }
                  }
                }, {
                  '$sort': {
                    'totalScore': -1
                  }
                }, {
                  '$project': {
                    'userId': 1, 
                    'totalScore': 1
                  }
                }
        ])
        return res.status(200).json({
            leaderBoard,
        });
    }catch(error){
        console.error(error)
        return res.status(400).json("Cannot fetch LeaderBoard")
    }
}

