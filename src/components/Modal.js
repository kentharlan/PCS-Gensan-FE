import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { Close } from "@mui/icons-material";

const Modal = (props) => {
    const { title, children, openModal, setOpenModal, width = "30vw" } = props;

    return (
        <Dialog onClose={() => setOpenModal(false)} open={openModal}
            sx={{ width: width, margin: "auto" }} maxWidth="false">
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