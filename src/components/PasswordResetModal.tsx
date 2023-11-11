import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';

interface PasswordResetModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onRequestClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
        } else {
            // Aquí puedes manejar el envío de la nueva contraseña
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Restablecer contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Nueva contraseña" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirmar nueva contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </Modal>
    );
}

export default PasswordResetModal;