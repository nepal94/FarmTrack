package com.farmtrack.auth.filter;

import jakarta.servlet.*;
import java.io.IOException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        // Just allow everything for now
        chain.doFilter(request, response);
    }
}
