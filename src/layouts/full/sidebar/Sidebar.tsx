import { Sidebar } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import SimpleBar from "simplebar-react";
import React from "react";
import Upgrade from "./Upgrade";
import NavCollapse from "./NavCollapse";

const SidebarLayout = () => {
  return (
    <>
      <div className="xl:block hidden">
        <Sidebar
          className="menu-sidebar bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0"
          aria-label="Sidebar with multi-level dropdown example"
        >
          <SimpleBar style={{ height: 'calc(100vh - 60px)' }}>
            <Sidebar.Items className="px-5 mt-2">
              <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                {SidebarContent?.map((item, index) => (
                  <div className="caption" key={item.heading}>
                    <React.Fragment key={index}>
                      <h5 className="text-link dark:text-white/70 font-semibold leading-6 text-sm pb-2">
                        {item.heading}
                      </h5>
                      {item.children?.map((child, index) => (
                        <React.Fragment key={child.id && index}>
                          {child.children ? (
                            <div className="collpase-items">
                              <NavCollapse item={child} />
                            </div>
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  </div>
                ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </SimpleBar>

          <div style={{ marginTop: 'auto' }}>
            <Upgrade />
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarLayout;