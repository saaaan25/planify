const Sidebar = ({ children }) => {
    return (
        <div className="w-[210px] h-full bg-purple_1 p-3 flex flex-col">
            {children}
        </div>
    );
}
 
export default Sidebar;