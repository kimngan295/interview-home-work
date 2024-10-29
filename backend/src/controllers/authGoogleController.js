import passport from "passport";

export const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleCallback = passport.authenticate("google", {
    failureRedirect: "/",
});

export const redirectToProfile = (req, res) => {
    res.redirect("/profile");
};

export const profilePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        res.send(`Error`);
    }
};
