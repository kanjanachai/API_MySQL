const mysql = require('mysql');

////// Connect //////
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'api_mysql'
})

connection.connect((err) => {
    if(err) {
        console.log('Error connecting: ', err);
    }
    console.log('Connect success.');
})

////// GET //////
exports.read = async (req, res) => {
    const { id } = req.params;
    try {
       connection.query("SELECT * FROM idcard WHERE card_id = ?",
       [id],
        (err, result, fields) => {
            if (err) {
                console.log('Error insert: ', err);
                return res.status(400).send();
            }
           const formatData =  result.map((res) => {
                return {
                    id: res.card_id,
                    prefix: res.prefix,
                    fname: res.fname,
                    lname: res.lname,
                    birth: res.birth_date,
                    religion: res.religion,
                    address: res.address
                }
            })
            return res.status(200).json(formatData);
        })
    } catch (error) {
        
    }
}

////// POST //////
exports.create = async (req, res) => {
    const { card_id, prefix, fname, lname, birth_date, religion, address } = req.body;
    try {
        connection.query(
            "INSERT INTO idcard(card_id, prefix, fname, lname, birth_date, religion, address) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [ card_id, prefix, fname, lname, birth_date, religion, address ],
            (err, result, fields) => {
                if (err) {
                    console.log('Error insert: ', err);
                    return res.status(400).send();
                }
                return res.status(200).json({
                    message: "Insert success."
                })
            }
        )
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
}

////// UPDATE //////
exports.update = async (req, res) => {
    const { id } = req.params;
    const { card_id, prefix, fname, lname, birth_date, religion, address } = req.body;
    try {
        connection.query(
            "UPDATE idcard SET card_id = ?, prefix = ?, fname = ?, lname = ?, birth_date = ?, religion = ?, address = ? WHERE card_id = ?",
            [ card_id, prefix, fname, lname, birth_date, religion, address, id ],
            (err, result, fields) => {
                if (err) {
                    console.log('Error update: ', err);
                    return res.status(400).send();
                }
                return res.status(200).json({
                    message: "Update success."
                })
            }
        )
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
}

////// DELETE //////
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        connection.query(
            "DELETE FROM idcard WHERE card_id = ?",
            [id],
            (err, result, fields) => {
                if (err) {
                    console.log('Error delete: ', err);
                    return res.status(400).send();
                }
                return res.status(200).json({
                    message: "Delete success."
                })
            }
        )
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }

}