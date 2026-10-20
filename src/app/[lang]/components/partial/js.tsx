import Link from "next/link";
const Js = () => {
    return (
        <>
            <div className="cookies-warning shadow-lg">
                <div className="text">
                    {/* <?php echo $this->settings->cookies_warning_text; ?> */}
                </div>
                <Link href="javascript:void(0)"
                    // onClick={hide_cookies_warning()} 
                    className="icon-cl"><i className="fa fa-close"></i></Link>
            </div>
        </>
    );
};

export default Js;