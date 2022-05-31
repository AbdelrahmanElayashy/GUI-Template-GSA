import '../style/App.css';
import { Menu } from '../components/shared/menu/Menu';
import FormControl from '../components/forms/FormControl';

export function NewAppTemplate() {
    return (

        <>
            <Menu />
            <section>
                <h1>Create new app template</h1>
                <div>
                    <FormControl />
                </div>
            </section>
        </>
    )
}