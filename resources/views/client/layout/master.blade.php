<!doctype html>
<html>
<head>
    @include('client.include.head')
</head>
<body>
<div class="container-fluid">

    <header class="row">
        @include('client.include.header')
    </header>

    <div id="main">

            @yield('content')

    </div>

    <footer class="row">
        @include('client.include.footer')
    </footer>

</div>
</body>
</html>