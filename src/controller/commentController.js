import validateComment from "../middlewares/validationForms/commentValidation";
import Article from "../model/article";


const sendComment = async(req, res)=>{
    //comemnt object
    const commentholder = {
        name:res.locals.name,
        comment:req.body.comment
    }
    console.log(commentholder)
    //validate comment 
    const {error} = validateComment(commentholder)
    if (error){
      return res.send(error.details.map((e) => {
        return e.message.replace(/[^a-zA-Z0-9 ]/g, "")
    })).status(400)}else{
        //if no error, send comment to the respective article
        const article = await Article.findOne({ _id: req.params.id })
       article.comments.push(commentholder)
       await article.save();
       return res.send(article)
    }
 
}
export default sendComment;