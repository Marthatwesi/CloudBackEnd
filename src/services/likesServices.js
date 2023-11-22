import { validateLikes } from "../middlewares/validationForms/articleValidation";
import Article from "../model/article";


export class likesServices {
    static async hearts(id, clientEmail) {
      //find the article
          const article = await Article.findOne({ _id: id });
       //check if this person that has logged in already liked this article
          if (article.likes.clients.includes(clientEmail) == true) {

            //if already liked, then remove the like
            let x = article.likes.numberLikes - 1;
            let y = article.likes.clients.filter((p) => p !== clientEmail);
            await Article.findOneAndUpdate(
              { _id: id },
              { likes: { numberLikes: x, clients: y } }
            );
          } else {
            //if not, add alike 
            let z = article.likes.numberLikes + 1;
            let w = article.likes.clients;
            w.push(clientEmail);
            await Article.findOneAndUpdate(
              { _id: id },
              { likes: { numberLikes: z, clients: w } }
            );
          }
          //fetch this artcle from the database 
          const liked = await Article.findOne({ _id: id });
          //return feedback 
          return { state: "successful", data: liked };
        }
      }



