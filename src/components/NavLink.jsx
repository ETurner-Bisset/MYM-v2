import Link from 'next/link';

const NavLink = ({ href, children,  onClick, ...props }) => {
  return (
    <Link  href={href} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};
export default NavLink;
