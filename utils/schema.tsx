import { pgTable, integer,varchar,text,boolean } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aiOutput',{
    id: integer(),
    formData:varchar('formData'),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug'),
    createdBy:varchar('createdBy'),
    createdAt:varchar('createdAt')
})
export const UserSubscription=pgTable('userSubscription',{
    id:integer(),
    email:varchar('email'),
    userName:varchar('userName'),
    active:boolean('active'),
    paymentId:varchar('paymentId'),
    joinDate:varchar('joinData')
})