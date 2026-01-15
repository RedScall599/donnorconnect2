<svg viewBox="0 0 1400 2000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
    <marker id="arrowhead-return" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#666" />
    </marker>
  </defs>
  
  <!-- Background sections -->
  <rect x="20" y="20" width="1360" height="480" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2" rx="8"/>
  <rect x="20" y="520" width="1360" height="420" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" rx="8"/>
  <rect x="20" y="960" width="1360" height="420" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="8"/>
  <rect x="20" y="1400" width="1360" height="380" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="8"/>
  
  <!-- FLOW 1: LOGIN -->
  <text x="700" y="50" font-size="24" font-weight="bold" text-anchor="middle" fill="#1e40af">1. Login Flow</text>
  
  <!-- Participants -->
  <rect x="80" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="130" y="110" font-size="13" font-weight="bold" text-anchor="middle">User</text>
  
  <rect x="280" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="330" y="105" font-size="13" font-weight="bold" text-anchor="middle">Login Page</text>
  
  <rect x="480" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="530" y="100" font-size="13" font-weight="bold" text-anchor="middle">API</text>
  <text x="530" y="115" font-size="11" text-anchor="middle">/auth/login</text>
  
  <rect x="680" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="730" y="100" font-size="13" font-weight="bold" text-anchor="middle">Auth Lib</text>
  <text x="730" y="115" font-size="11" text-anchor="middle">validate()</text>
  
  <rect x="880" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="930" y="100" font-size="13" font-weight="bold" text-anchor="middle">Session</text>
  <text x="930" y="115" font-size="11" text-anchor="middle">create()</text>
  
  <rect x="1080" y="80" width="100" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="1130" y="110" font-size="13" font-weight="bold" text-anchor="middle">Database</text>
  
  <!-- Lifelines -->
  <line x1="130" y1="130" x2="130" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="330" y1="130" x2="330" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="530" y1="130" x2="530" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="730" y1="130" x2="730" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="930" y1="130" x2="930" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="1130" y1="130" x2="1130" y2="480" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Messages -->
  <line x1="130" y1="160" x2="330" y2="160" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="230" y="155" font-size="12" text-anchor="middle">1. Enter credentials</text>
  
  <line x1="330" y1="190" x2="530" y2="190" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="430" y="185" font-size="12" text-anchor="middle">2. POST /api/auth/login</text>
  
  <line x1="530" y1="220" x2="730" y2="220" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="630" y="215" font-size="12" text-anchor="middle">3. validate(email, password)</text>
  
  <line x1="730" y1="250" x2="1130" y2="250" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="930" y="245" font-size="12" text-anchor="middle">4. SELECT user, verify bcrypt</text>
  
  <line x1="1130" y1="280" x2="730" y2="280" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="930" y="275" font-size="12" text-anchor="middle">5. return user data</text>
  
  <!-- Success branch -->
  <rect x="500" y="300" width="660" height="140" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="520" y="325" font-size="13" font-weight="bold" fill="#16a34a">✓ Valid Credentials</text>
  
  <line x1="530" y1="340" x2="930" y2="340" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="730" y="335" font-size="12" text-anchor="middle">6. createSession(userId)</text>
  
  <line x1="930" y1="370" x2="1130" y2="370" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="1030" y="365" font-size="12" text-anchor="middle">7. INSERT session</text>
  
  <line x1="1130" y1="400" x2="330" y2="400" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="730" y="395" font-size="12" text-anchor="middle">8. 200 OK + Set-Cookie: session=token</text>
  
  <line x1="330" y1="425" x2="130" y2="425" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowhead)"/>
  <text x="230" y="420" font-size="12" text-anchor="middle">9. redirect('/dashboard')</text>
  
  <!-- Error branch -->
  <rect x="280" y="300" width="200" height="80" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
  <text x="300" y="325" font-size="13" font-weight="bold" fill="#dc2626">✗ Invalid Credentials</text>
  <line x1="330" y1="350" x2="130" y2="350" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrowhead)"/>
  <text x="230" y="345" font-size="12" text-anchor="middle">401 Unauthorized</text>
  
  
  <!-- FLOW 2: PROTECTED API -->
  <text x="700" y="550" font-size="24" font-weight="bold" text-anchor="middle" fill="#166534">2. Protected API Route</text>
  
  <!-- Participants -->
  <rect x="180" y="580" width="100" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="4"/>
  <text x="230" y="610" font-size="13" font-weight="bold" text-anchor="middle">Browser</text>
  
  <rect x="480" y="580" width="100" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="4"/>
  <text x="530" y="600" font-size="13" font-weight="bold" text-anchor="middle">API Route</text>
  <text x="530" y="615" font-size="11" text-anchor="middle">/api/*</text>
  
  <rect x="780" y="580" width="100" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="4"/>
  <text x="830" y="600" font-size="13" font-weight="bold" text-anchor="middle">Session</text>
  <text x="830" y="615" font-size="11" text-anchor="middle">getSession()</text>
  
  <rect x="1080" y="580" width="100" height="50" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="4"/>
  <text x="1130" y="610" font-size="13" font-weight="bold" text-anchor="middle">Database</text>
  
  <!-- Lifelines -->
  <line x1="230" y1="630" x2="230" y2="920" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="530" y1="630" x2="530" y2="920" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="830" y1="630" x2="830" y2="920" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="1130" y1="630" x2="1130" y2="920" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Messages -->
  <line x1="230" y1="660" x2="530" y2="660" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="380" y="655" font-size="12" text-anchor="middle">1. GET/POST + Cookie: session=token</text>
  
  <rect x="490" y="680" width="80" height="40" fill="#fef9c3" stroke="#ca8a04" stroke-width="1" rx="3"/>
  <text x="530" y="695" font-size="11" text-anchor="middle">2. Extract</text>
  <text x="530" y="710" font-size="11" text-anchor="middle">token</text>
  
  <line x1="530" y1="740" x2="830" y2="740" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="680" y="735" font-size="12" text-anchor="middle">3. getSession(token)</text>
  
  <line x1="830" y1="770" x2="1130" y2="770" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="980" y="765" font-size="12" text-anchor="middle">4. SELECT session JOIN user</text>
  
  <line x1="1130" y1="800" x2="830" y2="800" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="980" y="795" font-size="12" text-anchor="middle">5. user + organization</text>
  
  <!-- Branches -->
  <rect x="180" y="830" width="320" height="70" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="200" y="855" font-size="13" font-weight="bold" fill="#16a34a">✓ Valid Session</text>
  <text x="200" y="880" font-size="11">6. Return JSON data</text>
  <text x="200" y="895" font-size="11">(scoped by organizationId)</text>
  
  <rect x="540" y="830" width="320" height="70" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
  <text x="560" y="855" font-size="13" font-weight="bold" fill="#dc2626">✗ Invalid/Expired</text>
  <text x="560" y="880" font-size="11">6. 401 Unauthorized</text>
  <text x="560" y="895" font-size="11">{ error: "Unauthorized" }</text>
  
  
  <!-- FLOW 3: SERVER COMPONENT -->
  <text x="700" y="990" font-size="24" font-weight="bold" text-anchor="middle" fill="#b45309">3. Server Component Protection</text>
  
  <!-- Participants -->
  <rect x="280" y="1020" width="120" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="340" y="1040" font-size="13" font-weight="bold" text-anchor="middle">Layout.jsx</text>
  <text x="340" y="1055" font-size="11" text-anchor="middle">(dashboard)</text>
  
  <rect x="580" y="1020" width="120" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="640" y="1040" font-size="13" font-weight="bold" text-anchor="middle">Session</text>
  <text x="640" y="1055" font-size="11" text-anchor="middle">getSessionUser()</text>
  
  <rect x="880" y="1020" width="120" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="940" y="1045" font-size="13" font-weight="bold" text-anchor="middle">Database</text>
  
  <!-- Lifelines -->
  <line x1="340" y1="1070" x2="340" y2="1360" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="640" y1="1070" x2="640" y2="1360" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="940" y1="1070" x2="940" y2="1360" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Messages -->
  <line x1="340" y1="1100" x2="640" y2="1100" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="490" y="1095" font-size="12" text-anchor="middle">1. getSessionUser()</text>
  
  <rect x="600" y="1120" width="80" height="40" fill="#fef9c3" stroke="#ca8a04" stroke-width="1" rx="3"/>
  <text x="640" y="1135" font-size="11" text-anchor="middle">2. Read</text>
  <text x="640" y="1150" font-size="11" text-anchor="middle">cookies()</text>
  
  <line x1="640" y1="1180" x2="940" y2="1180" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="790" y="1175" font-size="12" text-anchor="middle">3. Lookup session + user</text>
  
  <line x1="940" y1="1210" x2="640" y2="1210" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="790" y="1205" font-size="12" text-anchor="middle">4. user w/ organization</text>
  
  <!-- Branches -->
  <rect x="280" y="1240" width="280" height="100" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="5"/>
  <text x="300" y="1265" font-size="13" font-weight="bold" fill="#dc2626">✗ No User</text>
  <text x="300" y="1288" font-size="11">→ redirect('/login')</text>
  <text x="300" y="1310" font-size="13" font-weight="bold" fill="#dc2626">✗ Not Admin (if required)</text>
  <text x="300" y="1330" font-size="11">→ redirect('/dashboard')</text>
  
  <rect x="600" y="1240" width="280" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="620" y="1265" font-size="13" font-weight="bold" fill="#16a34a">✓ Valid User</text>
  <text x="620" y="1288" font-size="11">→ Continue rendering</text>
  <text x="620" y="1308" font-size="11">→ Access user.organizationId</text>
  
  
  <!-- FLOW 4: LOGOUT -->
  <text x="700" y="1430" font-size="24" font-weight="bold" text-anchor="middle" fill="#be185d">4. Logout Flow</text>
  
  <!-- Participants -->
  <rect x="230" y="1460" width="100" height="50" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="4"/>
  <text x="280" y="1490" font-size="13" font-weight="bold" text-anchor="middle">Browser</text>
  
  <rect x="480" y="1460" width="100" height="50" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="4"/>
  <text x="530" y="1480" font-size="13" font-weight="bold" text-anchor="middle">API Logout</text>
  <text x="530" y="1495" font-size="11" text-anchor="middle">/auth/logout</text>
  
  <rect x="730" y="1460" width="100" height="50" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="4"/>
  <text x="780" y="1480" font-size="13" font-weight="bold" text-anchor="middle">Session</text>
  <text x="780" y="1495" font-size="11" text-anchor="middle">delete()</text>
  
  <rect x="980" y="1460" width="100" height="50" fill="#fce7f3" stroke="#ec4899" stroke-width="2" rx="4"/>
  <text x="1030" y="1490" font-size="13" font-weight="bold" text-anchor="middle">Database</text>
  
  <!-- Lifelines -->
  <line x1="280" y1="1510" x2="280" y2="1740" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="530" y1="1510" x2="530" y2="1740" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="780" y1="1510" x2="780" y2="1740" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="1030" y1="1510" x2="1030" y2="1740" stroke="#ccc" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Messages -->
  <line x1="280" y1="1540" x2="530" y2="1540" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="405" y="1535" font-size="12" text-anchor="middle">1. POST + Cookie: session=token</text>
  
  <line x1="530" y1="1580" x2="780" y2="1580" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="655" y="1575" font-size="12" text-anchor="middle">2. deleteSession(token)</text>
  
  <line x1="780" y1="1620" x2="1030" y2="1620" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="905" y="1615" font-size="12" text-anchor="middle">3. DELETE FROM sessions</text>
  
  <line x1="1030" y1="1660" x2="780" y2="1660" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="905" y="1655" font-size="12" text-anchor="middle">4. success</text>
  
  <line x1="530" y1="1700" x2="280" y2="1700" stroke="#ec4899" stroke-width="2.5" marker-end="url(#arrowhead)"/>
  <text x="405" y="1695" font-size="12" text-anchor="middle">5. Redirect /login</text>
  <text x="405" y="1715" font-size="11" text-anchor="middle">Set-Cookie: session=; Max-Age=0</text>
  
  <!-- Legend -->
  <rect x="1150" y="1830" width="220" height="140" fill="#ffffff" stroke="#666" stroke-width="2" rx="5"/>
  <text x="1260" y="1860" font-size="15" font-weight="bold" text-anchor="middle">Legend</text>
  
  <line x1="1170" y1="1885" x2="1230" y2="1885" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="1245" y="1890" font-size="12">Request/Call</text>
  
  <line x1="1170" y1="1910" x2="1230" y2="1910" stroke="#666" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead-return)"/>
  <text x="1245" y="1915" font-size="12">Response/Return</text>
  
  <rect x="1170" y="1925" width="50" height="20" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="1230" y="1940" font-size="12">Success path</text>
  
  <rect x="1170" y="1950" width="50" height="20" fill="#fee2e2" stroke="#dc2626" stroke-width="1"/>
  <text x="1230" y="1965" font-size="12">Error path</text>
</svg>