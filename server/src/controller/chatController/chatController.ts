import { Request, Response } from 'express';
import chatModel from '../../model/chatModel';
import studentModel from '../../model/userModel';
import MessageModel from '../../model/MessageModel';



export const accessChat = async (req: Request, res: Response) => {
  try {
    const { userId , oppUserId} = req.body;

    console.log(userId, 'user here ');
    console.log(oppUserId,"oppUserId hahah")

    if (!userId || !oppUserId) {
      console.log('UserId param not sent with the request');
      return res.sendStatus(400);
    }

    let isChat = await chatModel.find({
      users : {
        $all: [userId, oppUserId], 
      },
    })
    .populate({
        path: 'users', 
        select: 'studentName photo studentEmail ', 
        model: 'studentModel', 
      })
      .populate('latestMessage');

      console.log("isChat",isChat)

    if (isChat.length > 0) {
      return res.status(201).json({chat : isChat[0]});
    } else {
      var chatData = {
        chatName: 'sender',
        users: [userId, oppUserId],
      };
console.log(chatData,"nnnn")
      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          'users',
          '-password'
        );
        res.status(200).json(FullChat);
      } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
};


export const fetchChats =async (req: Request, res: Response) => {
    console.log("enter")
    try {
        const { user }= req.body
        chatModel.find({participants : {$elemMatch : {$eq : user._id}}})
        .populate('participants' , '-password')
        .populate('lastMessage')
        .sort({updatedAt : -1})
        .then(async(results:any) =>{
            results = await studentModel.populate(results , {
                path : 'lastMessage.sender',
                select : 'studentName photo'
            })

            res.status(200).json({results})
        })
        
    } catch (error:any) {
        res.status(400);
        throw new Error(error.message)
         
    }


}


export const showAllMessages = async (req: Request, res: Response) => {
  console.log("getting mesage")
    try {
      console.log(req.params)
        const chatId =req.params.chatId;

     
        const message = await MessageModel.find({chat : chatId})
        .populate('sender' , 'studentName photo')
        .populate('chat');

        if(!message){
            return;
        }

        res.status(200).json({ message})

    } catch (error) {
       console.log(error);
    }
}


export const submitMessage = async (req: Request, res: Response) => {
    try {
        
        const {content ,chatId,studentId} = req.body;

    

        if(!content || !chatId){
            return res.status(400).json({error : 'Invalid'});
        }

        let newMessage = {
            sender : studentId,
            chat : chatId,
            content  : content
        }

        let message = await MessageModel.create(newMessage);
        message = await message.populate('sender' , 'studentName photo');
        message = await message.populate('chat');
        // message = await studentModel.populate(message , {
        //     path : 'chat.users',
        //     select : 'studentName photo'
        // });

        await chatModel.findByIdAndUpdate(chatId , {
            lastMessage : message
        } , {new : true});

        console.log(message);

        return res.status(200).json({msg : 'Messsage sent' , message});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'There was an error processing your request' });
    }
    
} 