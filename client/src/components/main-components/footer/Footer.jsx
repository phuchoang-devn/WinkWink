import './footer.scss'
export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer>
                <p>Copyright © {currentYear}</p>
                <p>Inspired by <a href="https://www.figma.com/community/file/1286004753654932151">Friendzy Figma</a> and <a href="https://www.figma.com/community/file/1352523078986663535">GMLink Figma</a></p>
                <p>Made by Margarita Boiko, Vladyslav Kyselov, Anh Phuc Hoang</p>
            </footer>
        </>
    )
}