export const USER_ROLE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user',
  } as const; 
  
export type User_Role={
    ADMIN?:string,
    SUPER_ADMIN?:string,
    USER?:string,
    SELLER?:string
}

export const USER_STATUS = {
    ACTIVE: "active",
    BLOCKED: "blocked",
    MUTED: "muted",
  } as const;
  
  export type TUser_Role = typeof USER_ROLE[keyof typeof USER_ROLE]; 

  export type USER_STATUS = typeof USER_STATUS[keyof typeof USER_STATUS]; 
  // This creates a type with the literal values "active" | "blocked" | "muted".
  