import { useEffect, useState } from 'react';
import type { Contact } from '../types/contact';
import { getContacts } from '../services/contactsService';
import ContactRow from './ContactRow';

// El arreglo fijo del Paso 5 se elimina
function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        getContacts()
            .then((data) => setContacts(data))
            .catch(() => setError('No se pudieron cargar los contactos'))
            .finally(() => setCargando(false));
}, []);
if (cargando) {
    return <p className="text-muted">Cargando contactos…</p>;
}
if (error) {
    return <div className="alert alert-danger">{error}</div>;
}
return (
    <table className="table table-striped table-sm">
        {/* <thead> igual que en el Paso 7 */}
        <tbody>
            {contacts.map((contact) => (
                <ContactRow key={contact.id} contact={contact} />
            ))}
        </tbody>
    </table>
);
}
export default ContactList;