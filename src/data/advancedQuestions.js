export const advancedQuestionBank={
  source:'Master Prompt｜下一階段互動教材',
  items:[
    {id:'rectangle-14x12',type:'spatial-puzzle',target:{width:14,height:12},pieces:[[8,7],[6,7],[8,5],[6,5]],skills:['面積','分割','空間旋轉']},
    {id:'paper-fold-sequence',type:'fold-simulator',start:{width:16,height:12},foldSequence:['horizontal','vertical','vertical'],answer:3,skills:['規律','空間推理']},
    {id:'candy-96-66',type:'conditional-filter',start:96,filters:['remove-red','remove-blue-star'],answer:66,skills:['條件判斷','集合']},
    {id:'gear-6-2-1',type:'ratio',ratio:[6,2,1],gcd:12,values:[72,24,12],lcm:72,skills:['比例','最大公因數','最小公倍數']},
    {id:'lcm-plus-88',type:'number-line',lcm:88,max:500,landings:[88,176,264,352,440],answer:5,skills:['倍數','最小公倍數']},
  ],
};
