// export const validEmail = new RegExp(
// /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
// );

export const validPassword = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/
);

export const validName = new RegExp(
'^[a-zA-Z]{3,}$'
);