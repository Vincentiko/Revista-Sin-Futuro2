export const RevistaEvent = ({event}) => {
    const {titulo, user} = event;
    return (
        <>
            <strong>{titulo}</strong>
            <strong>{user.nombre}</strong>
        </>
    )
}