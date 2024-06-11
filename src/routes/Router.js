import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));
const BannerForm = lazy(() => import("../views/Banner/Form.js"));
const BannerTable = lazy(() => import("../views/Banner/BannerTable.js"));

const OfferBannerForm = lazy(() => import("../views/OfferBanner/Form.js"));
const OfferBannerTable = lazy(() => import("../views/OfferBanner/BannerTable.js"));

const ProductForm = lazy(() => import("../views/Product/Form.js"));
const ProductTable = lazy(() => import("../views/Product/ProductTable.js"));

const CategoryForm = lazy(() => import("../views/Category/Form.js"));
const CategoryTable = lazy(() => import("../views/Category/CategoryTable.js"));

const SubcategoryForm = lazy(() => import("../views/Subcategory/Form.js"));
const SubcategoryTable = lazy(() => import("../views/Subcategory/SubcategoryTable.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },

      { path: "/banner-form/", element: <BannerForm /> },
      { path: "/banner-table/", element: <BannerTable /> },

      { path: "/offer-banner-table/", element: <OfferBannerTable /> },
      { path: "/offer-banner-form/", element: <OfferBannerForm /> },

      { path: "/product-form/", element: <ProductForm /> },
      { path: "/product-table/", element: <ProductTable /> },

      { path: "/category-form/", element: <CategoryForm /> },
      { path: "/category-table/", element: <CategoryTable /> },

      { path: "/subcategory-form/", element: <SubcategoryForm /> },
      { path: "/subcategory-table/", element: <SubcategoryTable /> },




    ],
  },
];

export default ThemeRoutes;
