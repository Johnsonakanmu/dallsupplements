import{g as Y}from"./_commonjsHelpers-042e6b4d.js";function lt(){import.meta.url,import("_").catch(()=>1);async function*a(){}}var q=function a(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var s,r,n;if(Array.isArray(t)){if(s=t.length,s!=e.length)return!1;for(r=s;r--!==0;)if(!a(t[r],e[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(n=Object.keys(t),s=n.length,s!==Object.keys(e).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,n[r]))return!1;for(r=s;r--!==0;){var o=n[r];if(!a(t[o],e[o]))return!1}return!0}return t!==t&&e!==e};const R=Y(q),B=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],S=1,v=8;class U{static from(t){if(!(t instanceof ArrayBuffer))throw new Error("Data must be an instance of ArrayBuffer.");const[e,s]=new Uint8Array(t,0,2);if(e!==219)throw new Error("Data does not appear to be in a KDBush format.");const r=s>>4;if(r!==S)throw new Error(`Got v${r} data when expected v${S}.`);const n=B[s&15];if(!n)throw new Error("Unrecognized array type.");const[o]=new Uint16Array(t,2,1),[h]=new Uint32Array(t,4,1);return new U(h,o,n,t)}constructor(t,e=64,s=Float64Array,r){if(isNaN(t)||t<0)throw new Error(`Unpexpected numItems value: ${t}.`);this.numItems=+t,this.nodeSize=Math.min(Math.max(+e,2),65535),this.ArrayType=s,this.IndexArrayType=t<65536?Uint16Array:Uint32Array;const n=B.indexOf(this.ArrayType),o=t*2*this.ArrayType.BYTES_PER_ELEMENT,h=t*this.IndexArrayType.BYTES_PER_ELEMENT,i=(8-h%8)%8;if(n<0)throw new Error(`Unexpected typed array class: ${s}.`);r&&r instanceof ArrayBuffer?(this.data=r,this.ids=new this.IndexArrayType(this.data,v,t),this.coords=new this.ArrayType(this.data,v+h+i,t*2),this._pos=t*2,this._finished=!0):(this.data=new ArrayBuffer(v+o+h+i),this.ids=new this.IndexArrayType(this.data,v,t),this.coords=new this.ArrayType(this.data,v+h+i,t*2),this._pos=0,this._finished=!1,new Uint8Array(this.data,0,2).set([219,(S<<4)+n]),new Uint16Array(this.data,2,1)[0]=e,new Uint32Array(this.data,4,1)[0]=t)}add(t,e){const s=this._pos>>1;return this.ids[s]=s,this.coords[this._pos++]=t,this.coords[this._pos++]=e,s}finish(){const t=this._pos>>1;if(t!==this.numItems)throw new Error(`Added ${t} items when expected ${this.numItems}.`);return Z(this.ids,this.coords,this.nodeSize,0,this.numItems-1,0),this._finished=!0,this}range(t,e,s,r){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:n,coords:o,nodeSize:h}=this,i=[0,n.length-1,0],l=[];for(;i.length;){const u=i.pop()||0,c=i.pop()||0,p=i.pop()||0;if(c-p<=h){for(let d=p;d<=c;d++){const y=o[2*d],M=o[2*d+1];y>=t&&y<=s&&M>=e&&M<=r&&l.push(n[d])}continue}const f=p+c>>1,g=o[2*f],m=o[2*f+1];g>=t&&g<=s&&m>=e&&m<=r&&l.push(n[f]),(u===0?t<=g:e<=m)&&(i.push(p),i.push(f-1),i.push(1-u)),(u===0?s>=g:r>=m)&&(i.push(f+1),i.push(c),i.push(1-u))}return l}within(t,e,s){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:r,coords:n,nodeSize:o}=this,h=[0,r.length-1,0],i=[],l=s*s;for(;h.length;){const u=h.pop()||0,c=h.pop()||0,p=h.pop()||0;if(c-p<=o){for(let d=p;d<=c;d++)$(n[2*d],n[2*d+1],t,e)<=l&&i.push(r[d]);continue}const f=p+c>>1,g=n[2*f],m=n[2*f+1];$(g,m,t,e)<=l&&i.push(r[f]),(u===0?t-s<=g:e-s<=m)&&(h.push(p),h.push(f-1),h.push(1-u)),(u===0?t+s>=g:e+s>=m)&&(h.push(f+1),h.push(c),h.push(1-u))}return i}}function Z(a,t,e,s,r,n){if(r-s<=e)return;const o=s+r>>1;V(a,t,o,s,r,n),Z(a,t,e,s,o-1,1-n),Z(a,t,e,o+1,r,1-n)}function V(a,t,e,s,r,n){for(;r>s;){if(r-s>600){const l=r-s+1,u=e-s+1,c=Math.log(l),p=.5*Math.exp(2*c/3),f=.5*Math.sqrt(c*p*(l-p)/l)*(u-l/2<0?-1:1),g=Math.max(s,Math.floor(e-u*p/l+f)),m=Math.min(r,Math.floor(e+(l-u)*p/l+f));V(a,t,e,g,m,n)}const o=t[2*e+n];let h=s,i=r;for(O(a,t,s,e),t[2*r+n]>o&&O(a,t,s,r);h<i;){for(O(a,t,h,i),h++,i--;t[2*h+n]<o;)h++;for(;t[2*i+n]>o;)i--}t[2*s+n]===o?O(a,t,s,i):(i++,O(a,t,i,r)),i<=e&&(s=i+1),e<=i&&(r=i-1)}}function O(a,t,e,s){I(a,e,s),I(t,2*e,2*s),I(t,2*e+1,2*s+1)}function I(a,t,e){const s=a[t];a[t]=a[e],a[e]=s}function $(a,t,e,s){const r=a-e,n=t-s;return r*r+n*n}const Q={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:a=>a},G=Math.fround||(a=>t=>(a[0]=+t,a[0]))(new Float32Array(1)),E=2,x=3,b=4,k=5,H=6;class W{constructor(t){this.options=Object.assign(Object.create(Q),t),this.trees=new Array(this.options.maxZoom+1),this.stride=this.options.reduce?7:6,this.clusterProps=[]}load(t){const{log:e,minZoom:s,maxZoom:r}=this.options;e&&console.time("total time");const n=`prepare ${t.length} points`;e&&console.time(n),this.points=t;const o=[];for(let i=0;i<t.length;i++){const l=t[i];if(!l.geometry)continue;const[u,c]=l.geometry.coordinates,p=G(P(u)),f=G(L(c));o.push(p,f,1/0,i,-1,1),this.options.reduce&&o.push(0)}let h=this.trees[r+1]=this._createTree(o);e&&console.timeEnd(n);for(let i=r;i>=s;i--){const l=+Date.now();h=this.trees[i]=this._createTree(this._cluster(h,i)),e&&console.log("z%d: %d clusters in %dms",i,h.numItems,+Date.now()-l)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let s=((t[0]+180)%360+360)%360-180;const r=Math.max(-90,Math.min(90,t[1]));let n=t[2]===180?180:((t[2]+180)%360+360)%360-180;const o=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)s=-180,n=180;else if(s>n){const c=this.getClusters([s,r,180,o],e),p=this.getClusters([-180,r,n,o],e);return c.concat(p)}const h=this.trees[this._limitZoom(e)],i=h.range(P(s),L(o),P(n),L(r)),l=h.data,u=[];for(const c of i){const p=this.stride*c;u.push(l[p+k]>1?z(l,p,this.clusterProps):this.points[l[p+x]])}return u}getChildren(t){const e=this._getOriginId(t),s=this._getOriginZoom(t),r="No cluster with the specified id.",n=this.trees[s];if(!n)throw new Error(r);const o=n.data;if(e*this.stride>=o.length)throw new Error(r);const h=this.options.radius/(this.options.extent*Math.pow(2,s-1)),i=o[e*this.stride],l=o[e*this.stride+1],u=n.within(i,l,h),c=[];for(const p of u){const f=p*this.stride;o[f+b]===t&&c.push(o[f+k]>1?z(o,f,this.clusterProps):this.points[o[f+x]])}if(c.length===0)throw new Error(r);return c}getLeaves(t,e,s){e=e||10,s=s||0;const r=[];return this._appendLeaves(r,t,e,s,0),r}getTile(t,e,s){const r=this.trees[this._limitZoom(t)],n=Math.pow(2,t),{extent:o,radius:h}=this.options,i=h/o,l=(s-i)/n,u=(s+1+i)/n,c={features:[]};return this._addTileFeatures(r.range((e-i)/n,l,(e+1+i)/n,u),r.data,e,s,n,c),e===0&&this._addTileFeatures(r.range(1-i/n,l,1,u),r.data,n,s,n,c),e===n-1&&this._addTileFeatures(r.range(0,l,i/n,u),r.data,-1,s,n,c),c.features.length?c:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const s=this.getChildren(t);if(e++,s.length!==1)break;t=s[0].properties.cluster_id}return e}_appendLeaves(t,e,s,r,n){const o=this.getChildren(e);for(const h of o){const i=h.properties;if(i&&i.cluster?n+i.point_count<=r?n+=i.point_count:n=this._appendLeaves(t,i.cluster_id,s,r,n):n<r?n++:t.push(h),t.length===s)break}return n}_createTree(t){const e=new U(t.length/this.stride|0,this.options.nodeSize,Float32Array);for(let s=0;s<t.length;s+=this.stride)e.add(t[s],t[s+1]);return e.finish(),e.data=t,e}_addTileFeatures(t,e,s,r,n,o){for(const h of t){const i=h*this.stride,l=e[i+k]>1;let u,c,p;if(l)u=K(e,i,this.clusterProps),c=e[i],p=e[i+1];else{const m=this.points[e[i+x]];u=m.properties;const[d,y]=m.geometry.coordinates;c=P(d),p=L(y)}const f={type:1,geometry:[[Math.round(this.options.extent*(c*n-s)),Math.round(this.options.extent*(p*n-r))]],tags:u};let g;l||this.options.generateId?g=e[i+x]:g=this.points[e[i+x]].id,g!==void 0&&(f.id=g),o.features.push(f)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(Math.floor(+t),this.options.maxZoom+1))}_cluster(t,e){const{radius:s,extent:r,reduce:n,minPoints:o}=this.options,h=s/(r*Math.pow(2,e)),i=t.data,l=[],u=this.stride;for(let c=0;c<i.length;c+=u){if(i[c+E]<=e)continue;i[c+E]=e;const p=i[c],f=i[c+1],g=t.within(i[c],i[c+1],h),m=i[c+k];let d=m;for(const y of g){const M=y*u;i[M+E]>e&&(d+=i[M+k])}if(d>m&&d>=o){let y=p*m,M=f*m,_,N=-1;const T=((c/u|0)<<5)+(e+1)+this.points.length;for(const J of g){const A=J*u;if(i[A+E]<=e)continue;i[A+E]=e;const D=i[A+k];y+=i[A]*D,M+=i[A+1]*D,i[A+b]=T,n&&(_||(_=this._map(i,c,!0),N=this.clusterProps.length,this.clusterProps.push(_)),n(_,this._map(i,A)))}i[c+b]=T,l.push(y/d,M/d,1/0,T,-1,d),n&&l.push(N)}else{for(let y=0;y<u;y++)l.push(i[c+y]);if(d>1)for(const y of g){const M=y*u;if(!(i[M+E]<=e)){i[M+E]=e;for(let _=0;_<u;_++)l.push(i[M+_])}}}}return l}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e,s){if(t[e+k]>1){const o=this.clusterProps[t[e+H]];return s?Object.assign({},o):o}const r=this.points[t[e+x]].properties,n=this.options.map(r);return s&&n===r?Object.assign({},n):n}}function z(a,t,e){return{type:"Feature",id:a[t+x],properties:K(a,t,e),geometry:{type:"Point",coordinates:[X(a[t]),tt(a[t+1])]}}}function K(a,t,e){const s=a[t+k],r=s>=1e4?`${Math.round(s/1e3)}k`:s>=1e3?`${Math.round(s/100)/10}k`:s,n=a[t+H],o=n===-1?{}:Object.assign({},e[n]);return Object.assign(o,{cluster:!0,cluster_id:a[t+x],point_count:s,point_count_abbreviated:r})}function P(a){return a/360+.5}function L(a){const t=Math.sin(a*Math.PI/180),e=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return e<0?0:e>1?1:e}function X(a){return(a-.5)*360}function tt(a){const t=(180-a*360)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function et(a,t){var e={};for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&t.indexOf(s)<0&&(e[s]=a[s]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(a);r<s.length;r++)t.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(a,s[r])&&(e[s[r]]=a[s[r]]);return e}class w{static isAdvancedMarkerAvailable(t){return google.maps.marker&&t.getMapCapabilities().isAdvancedMarkersAvailable===!0}static isAdvancedMarker(t){return google.maps.marker&&t instanceof google.maps.marker.AdvancedMarkerElement}static setMap(t,e){this.isAdvancedMarker(t)?t.map=e:t.setMap(e)}static getPosition(t){if(this.isAdvancedMarker(t)){if(t.position){if(t.position instanceof google.maps.LatLng)return t.position;if(t.position.lat&&t.position.lng)return new google.maps.LatLng(t.position.lat,t.position.lng)}return new google.maps.LatLng(null)}return t.getPosition()}static getVisible(t){return this.isAdvancedMarker(t)?!0:t.getVisible()}}class F{constructor({markers:t,position:e}){this.markers=t,e&&(e instanceof google.maps.LatLng?this._position=e:this._position=new google.maps.LatLng(e))}get bounds(){if(this.markers.length===0&&!this._position)return;const t=new google.maps.LatLngBounds(this._position,this._position);for(const e of this.markers)t.extend(w.getPosition(e));return t}get position(){return this._position||this.bounds.getCenter()}get count(){return this.markers.filter(t=>w.getVisible(t)).length}push(t){this.markers.push(t)}delete(){this.marker&&(w.setMap(this.marker,null),this.marker=void 0),this.markers.length=0}}class st{constructor({maxZoom:t=16}){this.maxZoom=t}noop({markers:t}){return rt(t)}}const rt=a=>a.map(e=>new F({position:w.getPosition(e),markers:[e]}));class nt extends st{constructor(t){var{maxZoom:e,radius:s=60}=t,r=et(t,["maxZoom","radius"]);super({maxZoom:e}),this.state={zoom:-1},this.superCluster=new W(Object.assign({maxZoom:this.maxZoom,radius:s},r))}calculate(t){let e=!1;const s={zoom:t.map.getZoom()};if(!R(t.markers,this.markers)){e=!0,this.markers=[...t.markers];const r=this.markers.map(n=>{const o=w.getPosition(n);return{type:"Feature",geometry:{type:"Point",coordinates:[o.lng(),o.lat()]},properties:{marker:n}}});this.superCluster.load(r)}return e||(this.state.zoom<=this.maxZoom||s.zoom<=this.maxZoom)&&(e=!R(this.state,s)),this.state=s,e&&(this.clusters=this.cluster(t)),{clusters:this.clusters,changed:e}}cluster({map:t}){return this.superCluster.getClusters([-180,-90,180,90],Math.round(t.getZoom())).map(e=>this.transformCluster(e))}transformCluster({geometry:{coordinates:[t,e]},properties:s}){if(s.cluster)return new F({markers:this.superCluster.getLeaves(s.cluster_id,1/0).map(n=>n.properties.marker),position:{lat:e,lng:t}});const r=s.marker;return new F({markers:[r],position:w.getPosition(r)})}}class it{constructor(t,e){this.markers={sum:t.length};const s=e.map(n=>n.count),r=s.reduce((n,o)=>n+o,0);this.clusters={count:e.length,markers:{mean:r/e.length,sum:r,min:Math.min(...s),max:Math.max(...s)}}}}class ot{render({count:t,position:e},s,r){const o=`<svg fill="${t>Math.max(10,s.clusters.markers.mean)?"#ff0000":"#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${t}</text>
</svg>`,h=`Cluster of ${t} markers`,i=Number(google.maps.Marker.MAX_ZINDEX)+t;if(w.isAdvancedMarkerAvailable(r)){const c=new DOMParser().parseFromString(o,"image/svg+xml").documentElement;c.setAttribute("transform","translate(0 25)");const p={map:r,position:e,zIndex:i,title:h,content:c};return new google.maps.marker.AdvancedMarkerElement(p)}const l={position:e,zIndex:i,title:h,icon:{url:`data:image/svg+xml;base64,${btoa(o)}`,anchor:new google.maps.Point(25,25)}};return new google.maps.Marker(l)}}function at(a,t){for(let e in t.prototype)a.prototype[e]=t.prototype[e]}class j{constructor(){at(j,google.maps.OverlayView)}}var C;(function(a){a.CLUSTERING_BEGIN="clusteringbegin",a.CLUSTERING_END="clusteringend",a.CLUSTER_CLICK="click"})(C||(C={}));const ct=(a,t,e)=>{e.fitBounds(t.bounds)};class ht extends j{constructor({map:t,markers:e=[],algorithmOptions:s={},algorithm:r=new nt(s),renderer:n=new ot,onClusterClick:o=ct}){super(),this.markers=[...e],this.clusters=[],this.algorithm=r,this.renderer=n,this.onClusterClick=o,t&&this.setMap(t)}addMarker(t,e){this.markers.includes(t)||(this.markers.push(t),e||this.render())}addMarkers(t,e){t.forEach(s=>{this.addMarker(s,!0)}),e||this.render()}removeMarker(t,e){const s=this.markers.indexOf(t);return s===-1?!1:(w.setMap(t,null),this.markers.splice(s,1),e||this.render(),!0)}removeMarkers(t,e){let s=!1;return t.forEach(r=>{s=this.removeMarker(r,!0)||s}),s&&!e&&this.render(),s}clearMarkers(t){this.markers.length=0,t||this.render()}render(){const t=this.getMap();if(t instanceof google.maps.Map&&t.getProjection()){google.maps.event.trigger(this,C.CLUSTERING_BEGIN,this);const{clusters:e,changed:s}=this.algorithm.calculate({markers:this.markers,map:t,mapCanvasProjection:this.getProjection()});if(s||s==null){const r=new Set;for(const o of e)o.markers.length==1&&r.add(o.markers[0]);const n=[];for(const o of this.clusters)o.marker!=null&&(o.markers.length==1?r.has(o.marker)||w.setMap(o.marker,null):n.push(o.marker));this.clusters=e,this.renderClusters(),requestAnimationFrame(()=>n.forEach(o=>w.setMap(o,null)))}google.maps.event.trigger(this,C.CLUSTERING_END,this)}}onAdd(){this.idleListener=this.getMap().addListener("idle",this.render.bind(this)),this.render()}onRemove(){google.maps.event.removeListener(this.idleListener),this.reset()}reset(){this.markers.forEach(t=>w.setMap(t,null)),this.clusters.forEach(t=>t.delete()),this.clusters=[]}renderClusters(){const t=new it(this.markers,this.clusters),e=this.getMap();this.clusters.forEach(s=>{s.markers.length===1?s.marker=s.markers[0]:(s.marker=this.renderer.render(s,t,e),s.markers.forEach(r=>w.setMap(r,null)),this.onClusterClick&&s.marker.addListener("click",r=>{google.maps.event.trigger(this,C.CLUSTER_CLICK,s),this.onClusterClick(r,s,e)})),w.setMap(s.marker,e)})}}window.MarkerClusterer=ht;export{lt as __vite_legacy_guard};
