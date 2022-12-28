import { getUsers, getUser, deleteUser, updateUser } from "./control.controller.js"
import { signUp,  signIn, resendEmail } from "./email.controller.js"
import { confirmToken, tokenSignIn } from "./token.controller.js"
import { getPasswordEmail, resetPassword } from "./password.controller.js"
import { GoogleSignIn } from "./thirdparty.controller.js"

export {
    getUsers,
    signUp,
    signIn,
    resendEmail,
    confirmToken,
    getPasswordEmail,
    resetPassword,
    GoogleSignIn,
    getUser,
    deleteUser,
    updateUser,
    tokenSignIn,
}