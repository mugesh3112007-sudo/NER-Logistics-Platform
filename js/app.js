// NER LogiSmart — app.js
// This JS is a stub: loads dashboard cards, fake data for charts, simple UI logic, and section scroll

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        document.querySelector('#preloader').classList.add('hidden');
    }, 1100);

    // Stat Animations
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = Number(el.dataset.target || el.textContent);
        let count = 0;
        const duration = 1400;
        const stepTime = Math.max(Math.floor(duration / target), 18);
        let intv = setInterval(() => {
            if(count < target) {
                count++;
                el.textContent = count;
            } else {
                el.textContent = target;
                clearInterval(intv);
            }
        }, stepTime);
    });

    // Navbar: add .scrolled
    document.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 40);
    });

    // Nav toggle (mobile)
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle?.addEventListener('click', ()=>{
        navLinks.classList.toggle('open');
    });
    Array.from(document.querySelectorAll('.nav-links a')).forEach(link=>{
        link.addEventListener('click', ()=> navLinks.classList.remove('open'));
    });

    // Notification panel open/close
    const notifPanel = document.getElementById('notifPanel');
    document.getElementById('notifyBtn').onclick = ()=> notifPanel.classList.add('open');
    document.getElementById('closeNotif').onclick = ()=> notifPanel.classList.remove('open');

    // Demo notification list
    const notifList = document.getElementById('notifList');
    notifList.innerHTML = `
    <div class="notif-item"><div class="notif-title">Landslide Alert</div><div class="notif-text">NH-6 blocked near Jowai (Meghalaya).</div><div class="notif-time">8 min ago</div></div>
    <div class="notif-item"><div class="notif-title">Flood Risk</div><div class="notif-text">Flood alert: Dhemaji–North Lakhimpur corridor.</div><div class="notif-time">24 min ago</div></div>
    <div class="notif-item"><div class="notif-title">Delivery Delay</div><div class="notif-text">Agartala medical cargo delayed (traffic jam).</div><div class="notif-time">1h ago</div></div>
    <div class="notif-item"><div class="notif-title">Bridge Status Update</div><div class="notif-text">Brahmaputra Bridge open for light vehicles.</div><div class="notif-time">2h ago</div></div>
    <div class="notif-item"><div class="notif-title">Weather Alert</div><div class="notif-text">Heavy rain predicted over Upper Siang, Arunachal.</div><div class="notif-time">2h ago</div></div>
    `;

    // Charts (demo/fake data using ChartJS)
    if(window.Chart) {
        // Connectivity chart
        new Chart(document.getElementById('connectivityChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Assam', 'Meghalaya', 'Arunachal', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura', 'Sikkim'],
                datasets: [
                    { label: 'Accessible', backgroundColor: '#10b981', data: [244,102,71,79,66,85,99,51] },
                    { label: 'Blocked', backgroundColor: '#ef4444', data: [7,3,8,2,9,4,6,4] }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
                scales: {
                    x: { grid: {display:false}},
                    y: { grid: {display:true, color:'#22244b'}, beginAtZero:true }
                }
            }
        });
        // Supply chain chart
        new Chart(document.getElementById('supplyChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Medicines','Food','Construction','Agriculture'],
                datasets: [{ data: [35,40,15,10], backgroundColor: ['#14b8a6','#f59e0b','#3b82f6','#ef4444']}]
            },
            options: {
                plugins: { legend: {display: true, position:'bottom'}},
                cutout: 60
            }
        });
        // Disruption chart
        new Chart(document.getElementById('disruptionChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Day -6','','','Day -3','','','Today'],
                datasets: [
                    { label: 'Landslides', backgroundColor: 'rgba(239,68,68,0.04)', borderColor:'#ef4444', data: [2,4,5,3,7,4,3], tension: 0.4, fill:true },
                    { label: 'Floods', backgroundColor: 'rgba(59,130,246,0.04)', borderColor:'#3b82f6', data: [0,2,1,2,3,2,4], tension: 0.4, fill:true },
                    { label: 'Road Damage', backgroundColor:'rgba(245,158,11,0.04)', borderColor: '#f59e0b', data: [1,2,1,3,2,1,2], tension: 0.4, fill:true },
                    { label: 'Congestion', backgroundColor:'rgba(156,163,175,0.04)', borderColor:'#9ca3af', data: [8,7,10,7,6,8,6], tension: 0.4, fill:true }
                ]
            },
            options: { plugins:{legend:{position:'bottom'}}, scales:{ x: { grid:{display:false} }, y: { grid:{display:true, color:'#252967'}, beginAtZero:true }} }
        });
    }

    // Demo state table
    const tableRows = [
        {state:'Assam', d:34, r:310, a:286, b:8, v:72, c:'92%', s:'Good'},
        {state:'Meghalaya', d:13, r:128, a:99, b:8, v:24, c:'78%', s:'Moderate'},
        {state:'Arunachal Pradesh', d:15, r:89, a:71, b:8, v:21, c:'80%', s:'Moderate'},
        {state:'Nagaland', d:12, r:88, a:79, b:2, v:14, c:'89%', s:'Good'},
        {state:'Manipur', d:16, r:90, a:66, b:9, v:28, c:'73%', s:'Moderate'},
        {state:'Mizoram', d:11, r:92, a:85, b:4, v:16, c:'92%', s:'Good'},
        {state:'Tripura', d:8, r:105, a:99, b:6, v:14, c:'94%', s:'Good'},
        {state:'Sikkim', d:8, r:50, a:51, b:4, v:13, c:'88%', s:'Good'},
    ];
    let table = document.querySelector('#stateTable tbody');
    table.innerHTML = tableRows.map(r=>`
        <tr><td>${r.state}</td><td>${r.d}</td><td>${r.r}</td><td>${r.a}</td><td>${r.b}</td><td>${r.v}</td><td><div class="connectivity-bar"><div class="fill" style="width:${r.c};background:${r.s==='Good'?'#10b981':(r.s==='Moderate'?'#f59e0b':'#ef4444')}"></div></div>${r.c}</td><td><span class="status-badge ${r.s.toLowerCase()}">${r.s}</span></td></tr>
    `).join('');

    // Map (stub)
    if(window.L) {
        let map = L.map('nerMap').setView([26.18, 91.75], 6.3);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap, SIH26002',
        }).addTo(map);
        // Demo routes
        const routes = [
            [[26.1445,91.7362],[25.5788,91.8933]], // Guwahati-Shillong
            [[24.8274,92.7979],[23.8315,91.282]], // Silchar-Agartala
            [[27.0834,93.6053],[27.4912,94.912]], // Itanagar-Tawang
        ];
        routes.forEach(route=> L.polyline(route, {color:'#10b981',weight:6,opacity:0.7}).addTo(map));
    }

    // Alerts List (stub)
    const alerts = [
        {type:'landslide', title:'Landslide on NH-6', desc:'NH-6 blocked near Jowai, Meghalaya.', time:'8 min ago', sev:'critical'},
        {type:'flood', title:'Flood Risk', desc:'Dhemaji district cut off – alternate via Lakhimpur.', time:'21 min ago', sev:'high'},
        {type:'road', title:'Road Damage', desc:'Tezpur–Itanagar, bridge repairs. One lane.', time:'55 min ago', sev:'moderate'},
        {type:'weather', title:'Heavy Rain Alert', desc:'Alert: Upper Siang, Arunachal (flood risk).', time:'1h ago', sev:'high'},
        {type:'traffic', title:'Traffic Jam', desc:'Agartala east entrance jam. +30 min delay.', time:'2h ago', sev:'moderate'},
    ];
    document.getElementById('alertsList').innerHTML = alerts.map(a=>
        `<div class="alert-item"><div class="alert-icon ${a.type}"><i class="fas fa-${ a.type==='landslide'?'mountain': a.type==='flood'?'water': a.type==='road'?'road': a.type==='weather'?'cloud-showers-heavy':'traffic-light'}"></i></div><div class="alert-content"><h4>${a.title}</h4><p>${a.desc}</p><div class="alert-meta"><span><i class="fas fa-clock"></i> ${a.time}</span></div></div><div class="alert-severity ${a.sev}">${a.sev.charAt(0).toUpperCase()+a.sev.slice(1)}</div></div>`
    ).join('');

    // Field Reports Demo
    document.getElementById('reportsList').innerHTML = `
      <div class="report-item"><div class="report-item-header"><span class="report-type-badge">Landslide</span><span class="report-time">12 min ago</span></div><h4>NH-27 near Sivasagar blocked</h4><p>Major landslide; earthmovers on site. Avoid route.</p><div class="report-item-footer"><span><i class="fas fa-map-marker-alt"></i> Assam</span> <span><i class="fas fa-user"></i> ASTC Officer</span></div></div>
      <div class="report-item"><div class="report-item-header"><span class="report-type-badge">Flood</span><span class="report-time">1h ago</span></div><h4>Dhemaji approach road flooded</h4><p>Water level rising; check alerts for alternate routes.</p><div class="report-item-footer"><span><i class="fas fa-map-marker-alt"></i> Assam</span> <span><i class="fas fa-user"></i> Field Staff</span></div></div>
      <div class="report-item"><div class="report-item-header"><span class="report-type-badge">Road Condition</span><span class="report-time">2h ago</span></div><h4>Mokokchung–Zunheboto rough patch</h4><p>Potholes, single lane only. Drive cautiously.</p><div class="report-item-footer"><span><i class="fas fa-map-marker-alt"></i> Nagaland</span> <span><i class="fas fa-user"></i> PWD</span></div></div>
    `;

    // Lang toggle stub
    document.getElementById('langToggle').onclick = () => {
        let btn = document.getElementById('langToggle');
        btn.innerHTML = btn.innerHTML.includes('EN') ? '<i class="fas fa-language"></i> हि' : '<i class="fas fa-language"></i> EN';
    };

    // Upload photo preview
    document.getElementById('uploadZone').onclick = () => document.getElementById('photoUpload').click();
    document.getElementById('photoUpload').onchange = (e) => {
        let preview = document.getElementById('uploadPreview');
        preview.innerHTML = '';
        for(const file of e.target.files) {
            let url = URL.createObjectURL(file);
            preview.innerHTML += `<img src="${url}" class="preview-thumb">`;
        }
    };

    // GPS button stub
    document.getElementById('gpsBtn').onclick = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            document.getElementById('reportLat').value = pos.coords.latitude.toFixed(4);
            document.getElementById('reportLng').value = pos.coords.longitude.toFixed(4);
        }, () => {
            alert('Could not access location.');
        });
    };

    // Field Report Form stub
    document.getElementById('fieldReportForm').onsubmit = (e) => {
        e.preventDefault();
        showToast('Report submitted!', 'Thank you for your field input.', 'success');
        e.target.reset();
        document.getElementById('uploadPreview').innerHTML = '';
    };

    // Dummy Route Optimizer
    document.getElementById('optimizeBtn').onclick = (e) => {
        e.preventDefault();
        let resultDiv = document.getElementById('optimizerResults');
        resultDiv.innerHTML = `<div class='route-result'><div class='route-result-header'><h3><i class='fas fa-route'></i> AI Optimization Results</h3><div class='ai-confidence'><span>Confidence</span> <div class='confidence-bar'><div class='confidence-fill' style='width:93%'></div></div> <span>93%</span></div></div><div class='route-options'><div class='route-option recommended'><div class='route-name'><i class='fas fa-road'></i> Guwahati → Tawang (via NH-13)</div><div class='route-meta'><span><i class='fas fa-clock'></i> 13h 20m</span><span><i class='fas fa-mountain'></i> Hilly, landslide-prone</span></div><div class='route-warnings'><span class='route-warning high'><i class='fas fa-mountain'></i> Minor Landslide @Bhalukpong</span></div></div><div class='route-option'><div class='route-name'><i class='fas fa-road'></i> Guwahati → Tawang (via Tezpur)</div><div class='route-meta'><span><i class='fas fa-clock'></i> 15h 35m</span><span><i class='fas fa-cloud-showers-heavy'></i> Heavy Rain</span></div><div class='route-warnings'><span class='route-warning medium'><i class='fas fa-cloud-showers-heavy'></i> Rain Delay</span></div></div></div></div>`;
    };

    // Section fade-in on scroll
    function fadeInOnScroll() {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight - 70) el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    // Simple toast popup
    function showToast(title, text, type='success') {
        let toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class='fas fa-check-circle'></i><div class='toast-content'><h4>${title}</h4><p>${text}</p></div>`;
        document.body.appendChild(toast);
        setTimeout(()=> toast.remove(), 2800);
    }
});
