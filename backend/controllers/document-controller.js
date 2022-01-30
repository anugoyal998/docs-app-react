const Document = require('../models/documentSchema')
const getDocumet = async (id,user) => {
    if(!id)return
    try {
        const findData = await Document.find({id})
        if(findData && findData.length > 0)return findData[0]
        const data = new Document({id, data: "",user,name: 'Untitled Doc'})
        await data.save()
        return data
    } catch (error) {
        console.log(error)
        return
    }
}

const updateDocument = async (id,data)=> {
    try {
        const document = await Document.findOne({id: id})
        if(!document)return
        return await Document.findByIdAndUpdate(document._id,{data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDocumet,
    updateDocument
}