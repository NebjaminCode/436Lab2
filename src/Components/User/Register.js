export default function Register() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="register-username">Username:</label>
            <input type="text" name="register-username" id="register-username" />
            <label htmlFor="register-password">Password:</label>
            <input type="password" name="register-password" id="register-password" />
            <label htmlFor="register-password-repeat">Repeat Password:</label>
            <input type="password" name="repeat-register-password" id="register-password-repeat" />
            <input type="submit" value="Register" />
        </form>
    )
}