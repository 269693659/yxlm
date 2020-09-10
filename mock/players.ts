import { Response, Request } from 'express'
import { Hero,Player } from '../src/api/types'
import {heros} from './heros'
import faker from 'faker'
faker.locale = 'zh_CN'
// 模拟玩家数据
const playercount = 100
const playerList:Player[]=[]
for(let i=0;i<playercount;i++){
    playerList.push({
        id: i,
        accountname:faker.name.findName(),
        nickname:faker.name.findName(),
        avatar:faker.image.avatar(),
        level:faker.random.number(30),
        exp:faker.random.number(1000),
        rank:faker.random.number(200),
        bravepoints:faker.random.number(1000),
        winningstreak:faker.random.number(10),
        wanttoplay:getwanttoplay(),
    })
}
function getwanttoplay(){
    let wanttoplay :Set<Hero> = new Set()
    while(wanttoplay.size<3){
        wanttoplay.add(heros[faker.random.number(10)])
    }
    return Array.from(wanttoplay)
}
// 路由实现
export const getPlayers=(req:Request,res:Response)=>{
    const { accountname , page=1, limit=10 } = req.query
    let mockList = playerList.filter(item=>{
        if(accountname && item.accountname.indexOf(accountname as string)<0){
            return false
        }
        return true
    })
    let pageList = mockList.filter((_,index)=>index<(page as number) * (limit as number) && index >= (limit as number)*(page as number - 1 ))
    res.json({
        code:1,
        data:{
            total:pageList.length,
            datas:pageList
        }
    })
}

export const getPlayer=(req:Request,res:Response)=>{
    const {id} = req.params
    let data = playerList.find(item=> id === item.id.toString())
    if(data){
        res.json({
            code:1,
            data:{
                datas:data
            }
        })
    }else{
        res.json({
            code:0,
            msg:"没有找到相应玩家信息"
        })
    }
}
export const createPlayer=(req:Request,res:Response)=>{
    const {player} = req.body
    res.json({
        code:1,
        data:{
            datas:player
        }
    })
}