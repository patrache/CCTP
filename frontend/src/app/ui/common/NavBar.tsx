import { BiBarChartAlt2, BiHomeAlt } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import logo from "/Users/gimsangsu/Desktop/develop/project/noProject/CCTP/frontend/public/cctp_logo.png";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

type LinkContentProps = {
  myPath: boolean;
};

const NavBarWrapper = styled.div`
  width: 282px;
  border-radius: 10px;
`;

const ProjectTitleWrapper = styled.div`
  display: flex;
  width: 242px;
  padding: 104px 20px 16px 20px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: space-evenly;
`;

const ProjectTitle = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: #484848;
`;

const LinkContent = styled.div<LinkContentProps>`
  margin: 10px 0px 10px 0px;
  background-color: ${(props) => (props.myPath ? "#B4BDFF40" : "#ffffff")};
  border-radius: 10px;
  padding: 16px 16px 16px 24px;
  height: 36px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 22px;
  color: ${(props) => (props.myPath ? "#83A2FF" : "#484848")};
  font-weight: 500;
  &:hover {
    background-color: #b4bdff40;
    transition: 0.2s;
  }
`;

const HomeIcon = styled(BiHomeAlt)<LinkContentProps>`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  color: ${(props) => (props.myPath ? "#83A2FF" : "#484848")};
`;

const Ec2Icon = styled(BiBarChartAlt2)<LinkContentProps>`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  color: ${(props) => (props.myPath ? "#83A2FF" : "#484848")};
`;

const HTCondorIcon = styled(MdOutlineDashboard)<LinkContentProps>`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  color: ${(props) => (props.myPath ? "#83A2FF" : "#484848")};
`;

const RestArea = styled.div`
  width: 282px;
  height: 510px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Ec2",
    href: "/dashboard/ec2",
    icon: Ec2Icon,
  },
  {
    name: "HTCondor",
    href: "/dashboard/htcondor",
    icon: HTCondorIcon,
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      <NavBarWrapper>
        <ProjectTitleWrapper>
          <Image src={logo} width={60} height={60} alt="fuck" />
          <ProjectTitle>CCTP</ProjectTitle>
        </ProjectTitleWrapper>
        {links.map((link) => {
          return (
            <Link key={link.name} href={link.href}>
              <LinkContent myPath={link.href === pathname}>
                <link.icon myPath={link.href === pathname} />
                {link.name}
              </LinkContent>
            </Link>
          );
        })}
        <RestArea />
      </NavBarWrapper>
    </>
  );
}
