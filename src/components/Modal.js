import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { Close } from "@mui/icons-material";

const Modal = (props) => {
    const { title, children, openModal, setOpenModal } = props;

    return (
        <Dialog onClose={() => setOpenModal(false)} open={openModal}
            sx={{ width: "30vw", margin: "auto" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DialogTitle align="center" fontWeight={"bold"}>
                    {title}
                    <IconButton
                        onClick={() => setOpenModal(false)}
                        sx={{ position: 'absolute', right: 10, top: 12 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </div>
        </Dialog >
    )
}

export default Modal;