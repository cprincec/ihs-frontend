// export const validEmail = new RegExp(
// 	'^\\w+([\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$'
// );

export const validPassword = new RegExp(
	'^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}$'
);

export const validName = new RegExp(
'^[a-zA-Z]{3,}$');