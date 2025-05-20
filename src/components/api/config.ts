export class Api {
    static readonly BASE = "http://localhost:8000/";
    static readonly API_BASE = Api.BASE + "api/";
    static readonly API_ADMIN_BASE = Api.API_BASE + "admin/";
    static readonly LOGIN = Api.API_BASE + "login";
    static readonly REGISTER = Api.API_BASE + "register";
    static readonly GENRES = Api.API_BASE + "genres";
    static readonly GENRES_ADMIN = Api.API_ADMIN_BASE + "genres";
    static readonly DIRECTORS_ADMIN = Api.API_ADMIN_BASE + "directors";
    static readonly ACTORS_ADMIN = Api.API_ADMIN_BASE + "actors";
    static readonly IMAGES_ADMIN = Api.API_ADMIN_BASE + "images/";
    static readonly IMAGES_DIRECTORS_ADMIN = Api.IMAGES_ADMIN + "directors";
    static readonly IMAGES = Api.API_BASE + "images/";
    static readonly IMAGES_ACTORS = Api.IMAGES + "actors";
    static readonly IMAGES_MOVIES = Api.IMAGES + "movies";
    static readonly MOVIES_ADMIN = Api.API_ADMIN_BASE + "movies";
    static readonly MOVIES_ADMIN_SHORT = Api.API_ADMIN_BASE + "movies_s";
    static readonly HALLS_ADMIN = Api.API_ADMIN_BASE + "halls";
    static readonly HALLS_ADMIN_SHORT = Api.API_ADMIN_BASE + "halls_s";
    static readonly SESSIONS_ADMIN = Api.API_ADMIN_BASE + "sessions";
    static readonly LOGIN_ADMIN = Api.API_ADMIN_BASE + "login";
    static readonly TICKETS = Api.API_BASE + "tickets";
    static readonly TICKETS_CHECK = Api.API_BASE + "tickets_check";
}