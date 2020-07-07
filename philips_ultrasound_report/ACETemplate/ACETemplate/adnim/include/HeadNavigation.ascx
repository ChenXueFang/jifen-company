<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HeadNavigation.ascx.cs" Inherits="ACETemplate.adnim.include.HeadNavigation" %>
<div class="breadcrumbs head-contents" id="breadcrumbs" >
    <script type="text/javascript">
        try { ace.settings.check('breadcrumbs', 'fixed');   } catch (e) { }
    </script>

    <ul class="breadcrumb head-menu">
       <%-- <li>
            <i class="icon-home home-icon"></i>
            <a href="#">首页</a>
        </li>--%>

        <li>
                  <asp:Literal runat="server" ID="Literal1" >  </asp:Literal>                                    <%--<a href="<%=Level2Link %>"><%=Level2Name %></a>--%>
        </li>
        <li class="active"><%=Level3Name %>              <asp:Literal runat="server" ID="ltrheadertemplate"></asp:Literal>
</li>

    </ul>


    <!-- .breadcrumb -->
</div>
