export const LOGIN = {
    LOGIN: "Se Connecter",
    SIGNUP: "S'enregistrer",
    REGISTERED: "Déjà inscrit ?",
    NOT_REGISTERED: "Pas encore inscrit ?",
    EMAIL: "Email",
    PASSWORD: "Mot de passe"
}
export const PASSWORD = {
    WHOLEPASSWORD : {
        REGEXP: /^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){2,})(?=(?:.*[!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]){1,})([A-Za-z0-9éèçàù!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]{8,})$/,
        SUCCESS: "Le mot de passe est suffisament fort, Bravo !"
    },
    MORE_THAN_EIGHT_CHAR: {
        REGEXP: /^([A-Za-z0-9éèçàù!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]{8,})$/,
        ERROR: "Le mot de passe doit contenir au moins 8 caractères et NE PEUT PAS avoir d'espace",
        SUCCESS: "Le mot de passe contient au moins 8 caractères et n'a pas d'espace"
    },
    HAVE_UPPERCASE:{
        REGEXP: /^.*(?=(?:.*[A-Z]){1,}).*$/,
        ERROR: "Le mot de passe doit contenir au moins une majuscule",
        SUCCESS: "Le mot de passe contient au moins une majuscule"
    },
    HAVE_LOWERCASE:{
        REGEXP: /^.*(?=(?:.*[a-z]){1,}).*$/,
        ERROR: "Le mot de passe doit contenir au moins une minuscule",
        SUCCESS: "Le mot de passe contient au moins une minuscule"
    },
    HAVE_TWO_DIGITS:{
        REGEXP: /^.*(?=(?:.*\d){2,}).*$/,
        ERROR: "Le mot de passe doit contenir au moins 2 chiffres",
        SUCCESS: "Le mot de passe contient au moins 2 chiffres"
    },
    HAVE_SPECIAL_CHAR: {
        REGEXP: /^.*(?=(?:.*[!@#$£%^&*()\-_=+{};:,<.>\?\/\]\[]){1,}).*$/,
        ERROR: "Le mot de passe doit contenir au moins un caractère spécial",
        SUCCESS: "Le mot de passe contient au moins un caractère spécial"
    }
}