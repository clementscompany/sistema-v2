import bcrypt from "bcrypt";

export function GeneratePassword(password) {
  const salt = 5;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, newPass) => {
      if (err) {
        return reject({ error: err });
      }
      resolve({ senha: newPass });
    });
  });
}

export function DecodePassword(password, hash){
  return new Promise((resolve, reject)=>{
    bcrypt.compare(password, hash, (err, data)=>{
      if (err) {
        return reject({error:err});
      }
      resolve({status:data});
    })
  })
}


