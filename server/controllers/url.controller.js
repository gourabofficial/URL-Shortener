import { nanoid } from 'nanoid'
import Url from '../model/url.model.js';

export const generateShortUrl = async (req,res)=>{

    const body = req.body;
    if(!body.url) return res.status(400).json({error: " URL is required" });
    const shortId = nanoid(8);

    await Url.create({
        shortId:shortId,
        originalUrl: body.url,
        visitHistory:[],
    })

    return res.json({id:shortId});
}

export const getAnalytics = async (req,res) =>{
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}


 