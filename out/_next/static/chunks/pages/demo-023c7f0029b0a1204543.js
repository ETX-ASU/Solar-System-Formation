(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[656],{3712:function(e,n,l){"use strict";l.d(n,{g:function(){return g}});var t=l(85893),r=(l(67294),l(29163)),i=l(12938),a=l(45894),o=l(68610),s=l(38420),c=l(46336),d=l(12382),u=l(94084),b=l(6194),h=l(46505),E=l(90330),p=l(53516),m=(0,h.Z)({palette:{primary:{main:"#ffc844"}}}),g=(0,i.Pi)((function(e){var n,l,r,i,h=e.groups,g=e.Selectors,x=(0,p.m)(),S=x.testObjectsStore,j=x.godMode;return(0,t.jsx)(E.Z,{theme:m,children:(0,t.jsxs)(f,{children:[(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(g,{}),(0,t.jsxs)(a.Z,{mt:2,children:["Distance:"," ",null==(null===(n=S.selectedObject)||void 0===n?void 0:n.distance)?"--":"".concat(null===(l=S.selectedObject)||void 0===l?void 0:l.distance.toFixed(2)," AU")]}),(0,t.jsxs)(a.Z,{mt:2,children:["Angle:"," ",null==(null===(r=S.selectedObject)||void 0===r?void 0:r.angle)?"--":"".concat(Math.round(null===(i=S.selectedObject)||void 0===i?void 0:i.angle)," Degrees")]}),(0,t.jsx)(a.Z,{mt:2,children:(0,t.jsx)(o.Z,{variant:"contained",onClick:j,children:"God Mode"})})]}),(0,t.jsx)(a.Z,{children:h.map((function(e){return(0,t.jsxs)(c.Z,{component:"fieldset",variant:"standard",sx:{marginX:2},children:[(0,t.jsx)(u.Z,{component:"legend",children:e.label}),(0,t.jsxs)(s.Z,{row:!0,children:[e.controls.map((function(e){return(0,t.jsx)(d.Z,{control:(0,t.jsx)(b.Z,{checked:e.checked,onChange:e.toggle}),label:e.label},e.label)})),e.othersComponent]})]},e.label)}))})]})})})),f=r.ZP.div.withConfig({componentId:"sc-z3mp6n-0"})(["display:flex;font-size:12px;background-color:#2d3b4b;color:#e7e7e7;border-radius:3px;margin-top:32px;padding:12px 6px 6px 6px;.MuiFormLabel-colorPrimary,#demo-simple-select-label{color:#ebebeb;}.MuiInputBase-input{color:#ebebeb;padding:12px 10px;}.MuiOutlinedInput-notchedOutline{border-color:#ebebeb;}& .MuiSelect-root:hover .MuiOutlinedInput-notchedOutline{border-color:#ffc844;}"])},7670:function(e,n,l){"use strict";l.d(n,{W:function(){return m}});var t=l(85893),r=(l(67294),l(12938)),i=l(44260),a=l(56606),o=l(66418),s=l(46336),c=l(73390),d=l(39835),u=l(19744),b=l(38368),h=l(53516),E={PaperProps:{style:{maxHeight:224,width:250}}},p=[{name:b.MODEL_ELEMENTS_VISIBLE.ROCKS_AND_METALS_CONDENSE,label:"Rocks and metals condense"},{name:b.MODEL_ELEMENTS_VISIBLE.HYDROGEN_COMPOUNDS_CONDENSE,label:"Hydrogen compounds condense"},{name:b.MODEL_ELEMENTS_VISIBLE.FROST_LINE,label:"Frost line"},{name:b.MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,label:"Solar system planet icons and orbits"},{name:b.MODEL_ELEMENTS_VISIBLE.EXO_SYSTEM_PLANET_ICONS_AND_ORBITS,label:"Exo system planet icons and orbits"}],m=(0,r.Pi)((function(e){var n=e.onChange,l=(0,h.m)().settingsStore;return(0,t.jsxs)(s.Z,{sx:{m:1,width:300},children:[(0,t.jsx)(a.Z,{id:"demo-multiple-checkbox-label",style:{background:"#2d3b4b",paddingRight:10},children:"Solar system model elements"}),(0,t.jsx)(d.Z,{labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",multiple:!0,value:l.modelElements,onChange:function(e){var l=e.target.value;n("string"===typeof l?l.split(","):l)},input:(0,t.jsx)(i.Z,{label:"Tag"}),renderValue:function(e){return p.filter((function(n){var l=n.name;return e.includes(l)})).map((function(e){return e.label})).join(", ")},MenuProps:E,children:p.map((function(e){var n=e.name,r=e.label;return(0,t.jsxs)(o.Z,{value:n,children:[(0,t.jsx)(u.Z,{checked:l.modelElements.includes(n)}),(0,t.jsx)(c.Z,{primary:r})]},n)}))})]})}))},98397:function(e,n,l){"use strict";l.d(n,{G:function(){return m}});var t=l(85893),r=(l(67294),l(12938)),i=l(44260),a=l(56606),o=l(66418),s=l(46336),c=l(73390),d=l(39835),u=l(19744),b=l(38368),h=l(53516),E={PaperProps:{style:{maxHeight:224,width:250}}},p=[{name:b.OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,label:"Distance from sun"},{name:b.OBJECT_PARAMETERS.TEMPERATURE,label:"Temperature"},{name:b.OBJECT_PARAMETERS.CONDENSED,label:"Condensed"},{name:b.OBJECT_PARAMETERS.SOLID_MATERIALS,label:"Solid Materials"}],m=(0,r.Pi)((function(e){var n=e.onChange,l=(0,h.m)().settingsStore;return(0,t.jsxs)(s.Z,{sx:{m:1,width:300},children:[(0,t.jsx)(a.Z,{id:"demo-multiple-checkbox-label",style:{background:"#2d3b4b",paddingRight:10},children:"Parameters Displayed"}),(0,t.jsx)(d.Z,{labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",multiple:!0,value:l.parametersDisplayed,onChange:function(e){var l=e.target.value;n("string"===typeof l?l.split(","):l)},input:(0,t.jsx)(i.Z,{label:"Tag"}),renderValue:function(e){return p.filter((function(n){var l=n.name;return e.includes(l)})).map((function(e){return e.label})).join(", ")},MenuProps:E,children:p.map((function(e){var n=e.name,r=e.label;return(0,t.jsxs)(o.Z,{value:n,children:[(0,t.jsx)(u.Z,{checked:l.parametersDisplayed.includes(n)}),(0,t.jsx)(c.Z,{primary:r})]},n)}))})]})}))},80883:function(e,n,l){"use strict";l.r(n),l.d(n,{default:function(){return _}});var t=l(85893),r=l(29163),i=l(51536),a=l(87280),o=(l(67294),l(12938)),s=l(68949),c=l(53516),d=l(45894),u=l(56606),b=l(66418),h=l(46336),E=l(39835),p=l(38368),m=(0,o.Pi)((function(){var e=(0,c.m)().settingsStore;return(0,t.jsx)(d.Z,{sx:{minWidth:200,marginRight:2},children:(0,t.jsxs)(h.Z,{fullWidth:!0,children:[(0,t.jsx)(u.Z,{id:"demo-simple-select-label",color:"primary",children:"Mode"}),(0,t.jsxs)(E.Z,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:e.mode||"",label:"Mode",onChange:function(n){e.setMode(n.target.value)},children:[(0,t.jsx)(b.Z,{value:p.MODES.PROBE,children:"Probe"}),(0,t.jsx)(b.Z,{value:p.MODES.STATE_OF_AGGREGATION,children:"State of aggregation"}),(0,t.jsx)(b.Z,{value:p.MODES.SOLAR_SYSTEM,children:"Solar system"}),(0,t.jsx)(b.Z,{value:p.MODES.FROST_LINE,children:"Frost line"}),(0,t.jsx)(b.Z,{value:p.MODES.EXOPLANETS,children:"Exoplanets"})]})]})})})),g=l(98397),f=l(3712),x=(0,o.Pi)((function(){var e,n=(0,c.m)().testObjectsStore;return(0,t.jsx)(d.Z,{sx:{minWidth:200,marginRight:2,marginTop:2},children:(0,t.jsxs)(h.Z,{fullWidth:!0,children:[(0,t.jsx)(u.Z,{id:"demo-selected-object-label",color:"primary",children:"Selected Object"}),(0,t.jsx)(E.Z,{labelId:"demo-selected-object-label",id:"demo-selected-object",value:(null===(e=n.selectedObject)||void 0===e?void 0:e.id)||"",label:"Selected Object",onChange:function(e){var l=n.objects.find((function(n){return n.id===e.target.value}));n.toggleSelection(l)},children:n.objects.map((function(e){return(0,t.jsx)(b.Z,{value:e.id,children:e.id},e.id)}))})]})})})),S=l(7670),j=(0,o.Pi)((function(){var e=(0,c.m)(),n=e.graphStore,l=e.settingsStore,r=function(e){return function(){(0,s.z)((function(){var l=(0,s.ZN)(n.graphElements);l.includes(e)?n.graphElements=l.filter((function(n){return n!==e})):n.graphElements=l.concat(e)}))}},i=[{label:"Bank objects",controls:[{checked:l.bankVisible,label:"Bank Visible",toggle:function(){return(0,s.z)((function(){return l.bankVisible=!l.bankVisible}))}},{checked:l.bankEnabled,label:"Bank Enabled",toggle:function(){return(0,s.z)((function(){return l.bankEnabled=!l.bankEnabled}))}}]},{label:"Radius",controls:[{checked:l.radiusVisible,label:"Radius Visible",toggle:function(){return(0,s.z)((function(){return l.radiusVisible=!l.radiusVisible}))}},{checked:l.radiusEnabled,label:"Radius Enabled",toggle:function(){return(0,s.z)((function(){return l.radiusEnabled=!l.radiusEnabled}))}}]},{label:"Object Parameters",controls:[{checked:l.parametersVisible,label:"Parameters Visible",toggle:function(){return(0,s.z)((function(){return l.parametersVisible=!l.parametersVisible}))}}],othersComponent:(0,t.jsx)(g.G,{onChange:l.setParametersDisplayed})},{label:"Solar system model elements",controls:[],othersComponent:(0,t.jsx)(S.W,{onChange:l.setModelElements})},{label:"Graph",controls:[{checked:n.trendLineVisible,label:"Trend Line",toggle:r(p.GRAPH_ELEMENTS.TREND_LINE)},{checked:n.temperatureAreaVisible,label:"Rock&Metal Condense",toggle:r(p.GRAPH_ELEMENTS.ROCKS_AND_METALS_CONDENSE)},{checked:n.frostLineAreaVisible,label:"Hydrogen Compounds Condense",toggle:r(p.GRAPH_ELEMENTS.HYDROGEN_COMPOUNDS_CONDENSE)},{checked:n.solarSystemIconsVisible,label:"Solar System Icons Visible",toggle:r(p.GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS)},{checked:n.exoplanetIconsVisible,label:"Exoplanets Icons Visible",toggle:r(p.GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS)},{checked:l.graphVisible,label:"Graph Visible",toggle:function(){return(0,s.z)((function(){return l.graphVisible=!l.graphVisible}))}},{checked:l.graphButtonVisible,label:"Graph Button Visible",toggle:function(){return(0,s.z)((function(){return l.graphButtonVisible=!l.graphButtonVisible}))}},{checked:l.graphButtonEnabled,label:"Graph Button Enabled",toggle:function(){return(0,s.z)((function(){return l.graphButtonEnabled=!l.graphButtonEnabled}))}},{checked:l.graphClearButtonVisible,label:"Graph Clear Button Visible",toggle:function(){return(0,s.z)((function(){return l.graphClearButtonVisible=!l.graphClearButtonVisible}))}},{checked:l.graphClearButtonEnabled,label:"Graph Clear Button Enabled",toggle:function(){return(0,s.z)((function(){return l.graphClearButtonEnabled=!l.graphClearButtonEnabled}))}}]},{label:"Helpers outside CAPI",controls:[{checked:l.drawHelpersOrbits,label:"Draw Helpers Orbits",toggle:function(){return(0,s.z)((function(){return l.drawHelpersOrbits=!l.drawHelpersOrbits}))}},{checked:l.drawObjectLabels,label:"Draw Object Labels",toggle:function(){return(0,s.z)((function(){return l.drawObjectLabels=!l.drawObjectLabels}))}}]}];return(0,t.jsx)(f.g,{groups:i,Selectors:function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(m,{}),(0,t.jsx)(x,{})]})}})})),O=r.ZP.div.withConfig({componentId:"sc-swswgu-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:space-between;width:1000px;min-height:calc(100vh - 64px);margin:32px auto;"]),_=function(){return(0,t.jsx)(a.g,{children:(0,t.jsxs)(O,{children:[(0,t.jsx)(i.g,{}),(0,t.jsx)(j,{})]})})}},65872:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demo",function(){return l(80883)}])}},function(e){e.O(0,[774,461,564,778,536,888,179],(function(){return n=65872,e(e.s=n);var n}));var n=e.O();_N_E=n}]);