import { ViewColumn, ViewEntity } from "typeorm";


@ViewEntity('get_user_info_view')
export class UserInfoView {
    @ViewColumn()
    u_id: string;

    @ViewColumn()
    u_email: string;

    @ViewColumn()
    u_loginSystem: string;

    @ViewColumn()
    u_isTwoFA: string;

    @ViewColumn()
    u_isConfirm: string;

    @ViewColumn()
    adr_lat: string;

    @ViewColumn()
    adr_long: string;

    @ViewColumn()
    adr_id: string;

    @ViewColumn()
    adr_userId: string;

}