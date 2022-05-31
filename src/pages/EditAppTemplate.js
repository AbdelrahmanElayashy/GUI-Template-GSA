import { Menu } from "../components/shared/menu/Menu"
import { AdminController } from "../components/admin/adminViewControl/AdminViewControl"

export function EditAppTemplate() {

    return (
        <>
            <Menu />
            <section>
                <h1>Create Service for App</h1>
                <div className="wrapper">
                    <AdminController />
                </div>
            </section>

        </>
    )
}