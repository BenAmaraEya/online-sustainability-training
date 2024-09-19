import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBookOpen, faComments, faDashboard } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  // Ensure userRole is defined and default to 'client' if not
  const role = localStorage.getItem('role') || 'client';

  const renderMenuItems = () => {
    switch (role) {
      case 'client':
        return (
          <>
          <NavLink exact="true" to="/formations" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faDashboard} />}>
              Dashboard
            </CDBSidebarMenuItem>
          </NavLink>
          
          <NavLink exact="true" to="/forums" activeClassName="activeClicked">
          <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faComments} />}>
            Forum
          </CDBSidebarMenuItem>
        </NavLink>
        </>
        );
      case 'admin':
        return (
          <>
            <NavLink exact="true" to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faUsers} />}>
                Users
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/listformations" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faBookOpen} />}>
                Formations
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/cours" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faBookOpen} />}>
                Cours
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/forums" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon={<FontAwesomeIcon icon={faComments} />}>
                Forum
              </CDBSidebarMenuItem>
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333"  >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          {/* Optional Sidebar Header */}
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {renderMenuItems()}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
